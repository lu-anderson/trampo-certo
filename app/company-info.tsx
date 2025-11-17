import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { CompanyInfoField } from '@/types/company';
import {
  formatDocument,
  formatInstagram,
  formatPhone,
  formatZipCode,
  validateDocument,
  validateEmail,
  validateInstagram,
  validatePhone,
  validateZipCode,
} from '@/utils/validation';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createCompanyInfo, getCompanyInfo } from '@/_service/company';

interface FormData {
  logo: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  instagram: string;
}

interface FormErrors {
  logo: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  instagram: string;
}

export default function CompanyInfoScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse required fields from URL params
  const requiredFields: CompanyInfoField[] = params.required
    ? (params.required as string).split(',') as CompanyInfoField[]
    : ['name', 'email', 'phone'];

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    logo: '',
    name: '',
    document: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    instagram: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    logo: '',
    name: '',
    document: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    instagram: '',
  });

  // Load existing company info if available
  useEffect(() => {
    async function loadCompanyInfo() {
      if (!user) return;

      try {
        const companyInfo = await getCompanyInfo(user.uid);
        if (companyInfo) {
          setFormData({
            logo: companyInfo.logo || '',
            name: companyInfo.name || '',
            document: companyInfo.document || '',
            email: companyInfo.email || '',
            phone: companyInfo.phone || '',
            street: companyInfo.address?.street || '',
            number: companyInfo.address?.number || '',
            complement: companyInfo.address?.complement || '',
            neighborhood: companyInfo.address?.neighborhood || '',
            city: companyInfo.address?.city || '',
            state: companyInfo.address?.state || '',
            zipCode: companyInfo.address?.zipCode || '',
            instagram: companyInfo.socialMedia?.instagram || '',
          });
        }
      } catch (error) {
        console.error('Error loading company info:', error);
      } finally {
        setInitialLoading(false);
      }
    }

    loadCompanyInfo();
  }, [user]);

  const isFieldRequired = (field: CompanyInfoField): boolean => {
    return requiredFields.includes(field);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de permissão para acessar suas fotos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setFormData({ ...formData, logo: `data:image/jpeg;base64,${result.assets[0].base64}` });
      if (errors.logo) {
        setErrors({ ...errors, logo: '' });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      logo: '',
      name: '',
      document: '',
      email: '',
      phone: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      instagram: '',
    };

    let isValid = true;

    // Validate name
    if (isFieldRequired('name') && !formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    // Validate document
    if (isFieldRequired('document')) {
      if (!formData.document.trim()) {
        newErrors.document = 'CPF/CNPJ é obrigatório';
        isValid = false;
      } else if (!validateDocument(formData.document)) {
        newErrors.document = 'CPF/CNPJ inválido';
        isValid = false;
      }
    }

    // Validate email
    if (isFieldRequired('email')) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email inválido';
        isValid = false;
      }
    }

    // Validate phone
    if (isFieldRequired('phone')) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
        isValid = false;
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Telefone inválido. Use (XX) XXXX-XXXX ou (XX) XXXXX-XXXX';
        isValid = false;
      }
    }

    // Validate address if required
    if (isFieldRequired('address')) {
      if (!formData.street.trim()) {
        newErrors.street = 'Rua é obrigatória';
        isValid = false;
      }
      if (!formData.number.trim()) {
        newErrors.number = 'Número é obrigatório';
        isValid = false;
      }
      if (!formData.neighborhood.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
        isValid = false;
      }
      if (!formData.city.trim()) {
        newErrors.city = 'Cidade é obrigatória';
        isValid = false;
      }
      if (!formData.state.trim()) {
        newErrors.state = 'Estado é obrigatório';
        isValid = false;
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'CEP é obrigatório';
        isValid = false;
      } else if (!validateZipCode(formData.zipCode)) {
        newErrors.zipCode = 'CEP inválido. Use XXXXX-XXX';
        isValid = false;
      }
    }

    // Validate social media if required
    if (isFieldRequired('socialMedia') && formData.instagram && !validateInstagram(formData.instagram)) {
      newErrors.instagram = 'Instagram inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      await createCompanyInfo(user.uid, {
        logo: formData.logo || undefined,
        name: formData.name,
        document: formData.document || undefined,
        email: formData.email,
        phone: formData.phone,
        address: isFieldRequired('address') ? {
          street: formData.street,
          number: formData.number,
          complement: formData.complement || undefined,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        } : undefined,
        socialMedia: isFieldRequired('socialMedia') ? {
          instagram: formData.instagram || undefined,
        } : undefined,
      });

      // Navigate to budget creation screen (placeholder for now)
      router.push('/(tabs)');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as informações');
      console.error('Error saving company info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tintColor} />
        <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedView style={styles.content}>
              <View style={styles.headerSection}>
                <ThemedText type="title" style={[styles.titleText, { color: textColor }]}>
                  Informações da Empresa
                </ThemedText>
                <ThemedText style={[styles.subtitleText, { color: iconColor }]}>
                  Preencha os dados para continuar
                </ThemedText>
              </View>

              <View style={styles.formSection}>
                {/* Logo */}
                {isFieldRequired('logo') && (
                  <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>
                      Logo {isFieldRequired('logo') ? '*' : ''}
                    </ThemedText>
                    <TouchableOpacity
                      style={[styles.logoButton, { borderColor: errors.logo ? '#ff4444' : iconColor }]}
                      onPress={pickImage}
                    >
                      {formData.logo ? (
                        <Image source={{ uri: formData.logo }} style={styles.logoImage} />
                      ) : (
                        <ThemedText style={[styles.logoButtonText, { color: iconColor }]}>
                          Selecionar Logo
                        </ThemedText>
                      )}
                    </TouchableOpacity>
                    {errors.logo ? (
                      <ThemedText style={styles.errorText}>{errors.logo}</ThemedText>
                    ) : null}
                  </View>
                )}

                {/* Name */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>
                    Nome {isFieldRequired('name') ? '*' : ''}
                  </ThemedText>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: errors.name ? '#ff4444' : iconColor,
                        color: textColor,
                      },
                    ]}
                    placeholder="Nome da empresa ou profissional"
                    placeholderTextColor={iconColor}
                    value={formData.name}
                    onChangeText={(text) => {
                      setFormData({ ...formData, name: text });
                      if (errors.name) {
                        setErrors({ ...errors, name: '' });
                      }
                    }}
                    autoCapitalize="words"
                  />
                  {errors.name ? (
                    <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
                  ) : null}
                </View>

                {/* Document */}
                {isFieldRequired('document') && (
                  <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>
                      CPF/CNPJ {isFieldRequired('document') ? '*' : ''}
                    </ThemedText>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          borderColor: errors.document ? '#ff4444' : iconColor,
                          color: textColor,
                        },
                      ]}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      placeholderTextColor={iconColor}
                      value={formData.document}
                      onChangeText={(text) => {
                        const formatted = formatDocument(text);
                        setFormData({ ...formData, document: formatted });
                        if (errors.document) {
                          setErrors({ ...errors, document: '' });
                        }
                      }}
                      keyboardType="numeric"
                    />
                    {errors.document ? (
                      <ThemedText style={styles.errorText}>{errors.document}</ThemedText>
                    ) : null}
                  </View>
                )}

                {/* Email */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>
                    Email {isFieldRequired('email') ? '*' : ''}
                  </ThemedText>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: errors.email ? '#ff4444' : iconColor,
                        color: textColor,
                      },
                    ]}
                    placeholder="seu@email.com"
                    placeholderTextColor={iconColor}
                    value={formData.email}
                    onChangeText={(text) => {
                      setFormData({ ...formData, email: text });
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email ? (
                    <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
                  ) : null}
                </View>

                {/* Phone */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>
                    Telefone {isFieldRequired('phone') ? '*' : ''}
                  </ThemedText>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: errors.phone ? '#ff4444' : iconColor,
                        color: textColor,
                      },
                    ]}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={iconColor}
                    value={formData.phone}
                    onChangeText={(text) => {
                      const formatted = formatPhone(text);
                      setFormData({ ...formData, phone: formatted });
                      if (errors.phone) {
                        setErrors({ ...errors, phone: '' });
                      }
                    }}
                    keyboardType="phone-pad"
                  />
                  {errors.phone ? (
                    <ThemedText style={styles.errorText}>{errors.phone}</ThemedText>
                  ) : null}
                </View>

                {/* Address Section */}
                {isFieldRequired('address') && (
                  <>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                      Endereço
                    </ThemedText>

                    <View style={styles.inputContainer}>
                      <ThemedText style={styles.inputLabel}>CEP *</ThemedText>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            borderColor: errors.zipCode ? '#ff4444' : iconColor,
                            color: textColor,
                          },
                        ]}
                        placeholder="00000-000"
                        placeholderTextColor={iconColor}
                        value={formData.zipCode}
                        onChangeText={(text) => {
                          const formatted = formatZipCode(text);
                          setFormData({ ...formData, zipCode: formatted });
                          if (errors.zipCode) {
                            setErrors({ ...errors, zipCode: '' });
                          }
                        }}
                        keyboardType="numeric"
                      />
                      {errors.zipCode ? (
                        <ThemedText style={styles.errorText}>{errors.zipCode}</ThemedText>
                      ) : null}
                    </View>

                    <View style={styles.rowContainer}>
                      <View style={[styles.inputContainer, styles.flexGrow]}>
                        <ThemedText style={styles.inputLabel}>Rua *</ThemedText>
                        <TextInput
                          style={[
                            styles.textInput,
                            {
                              borderColor: errors.street ? '#ff4444' : iconColor,
                              color: textColor,
                            },
                          ]}
                          placeholder="Nome da rua"
                          placeholderTextColor={iconColor}
                          value={formData.street}
                          onChangeText={(text) => {
                            setFormData({ ...formData, street: text });
                            if (errors.street) {
                              setErrors({ ...errors, street: '' });
                            }
                          }}
                        />
                        {errors.street ? (
                          <ThemedText style={styles.errorText}>{errors.street}</ThemedText>
                        ) : null}
                      </View>

                      <View style={[styles.inputContainer, styles.numberInput]}>
                        <ThemedText style={styles.inputLabel}>Nº *</ThemedText>
                        <TextInput
                          style={[
                            styles.textInput,
                            {
                              borderColor: errors.number ? '#ff4444' : iconColor,
                              color: textColor,
                            },
                          ]}
                          placeholder="123"
                          placeholderTextColor={iconColor}
                          value={formData.number}
                          onChangeText={(text) => {
                            setFormData({ ...formData, number: text });
                            if (errors.number) {
                              setErrors({ ...errors, number: '' });
                            }
                          }}
                          keyboardType="numeric"
                        />
                        {errors.number ? (
                          <ThemedText style={styles.errorText}>{errors.number}</ThemedText>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <ThemedText style={styles.inputLabel}>Complemento</ThemedText>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            borderColor: iconColor,
                            color: textColor,
                          },
                        ]}
                        placeholder="Apto, bloco, etc. (opcional)"
                        placeholderTextColor={iconColor}
                        value={formData.complement}
                        onChangeText={(text) => setFormData({ ...formData, complement: text })}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <ThemedText style={styles.inputLabel}>Bairro *</ThemedText>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            borderColor: errors.neighborhood ? '#ff4444' : iconColor,
                            color: textColor,
                          },
                        ]}
                        placeholder="Nome do bairro"
                        placeholderTextColor={iconColor}
                        value={formData.neighborhood}
                        onChangeText={(text) => {
                          setFormData({ ...formData, neighborhood: text });
                          if (errors.neighborhood) {
                            setErrors({ ...errors, neighborhood: '' });
                          }
                        }}
                      />
                      {errors.neighborhood ? (
                        <ThemedText style={styles.errorText}>{errors.neighborhood}</ThemedText>
                      ) : null}
                    </View>

                    <View style={styles.rowContainer}>
                      <View style={[styles.inputContainer, styles.flexGrow]}>
                        <ThemedText style={styles.inputLabel}>Cidade *</ThemedText>
                        <TextInput
                          style={[
                            styles.textInput,
                            {
                              borderColor: errors.city ? '#ff4444' : iconColor,
                              color: textColor,
                            },
                          ]}
                          placeholder="Nome da cidade"
                          placeholderTextColor={iconColor}
                          value={formData.city}
                          onChangeText={(text) => {
                            setFormData({ ...formData, city: text });
                            if (errors.city) {
                              setErrors({ ...errors, city: '' });
                            }
                          }}
                        />
                        {errors.city ? (
                          <ThemedText style={styles.errorText}>{errors.city}</ThemedText>
                        ) : null}
                      </View>

                      <View style={[styles.inputContainer, styles.stateInput]}>
                        <ThemedText style={styles.inputLabel}>UF *</ThemedText>
                        <TextInput
                          style={[
                            styles.textInput,
                            {
                              borderColor: errors.state ? '#ff4444' : iconColor,
                              color: textColor,
                            },
                          ]}
                          placeholder="SP"
                          placeholderTextColor={iconColor}
                          value={formData.state}
                          onChangeText={(text) => {
                            setFormData({ ...formData, state: text.toUpperCase() });
                            if (errors.state) {
                              setErrors({ ...errors, state: '' });
                            }
                          }}
                          maxLength={2}
                          autoCapitalize="characters"
                        />
                        {errors.state ? (
                          <ThemedText style={styles.errorText}>{errors.state}</ThemedText>
                        ) : null}
                      </View>
                    </View>
                  </>
                )}

                {/* Social Media Section */}
                {isFieldRequired('socialMedia') && (
                  <>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                      Redes Sociais
                    </ThemedText>

                    <View style={styles.inputContainer}>
                      <ThemedText style={styles.inputLabel}>Instagram</ThemedText>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            borderColor: errors.instagram ? '#ff4444' : iconColor,
                            color: textColor,
                          },
                        ]}
                        placeholder="@seuperfil"
                        placeholderTextColor={iconColor}
                        value={formData.instagram}
                        onChangeText={(text) => {
                          const formatted = formatInstagram(text);
                          setFormData({ ...formData, instagram: formatted });
                          if (errors.instagram) {
                            setErrors({ ...errors, instagram: '' });
                          }
                        }}
                        autoCapitalize="none"
                      />
                      {errors.instagram ? (
                        <ThemedText style={styles.errorText}>{errors.instagram}</ThemedText>
                      ) : null}
                    </View>
                  </>
                )}
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: tintColor }]}
                  onPress={handleNext}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={backgroundColor} />
                  ) : (
                    <ThemedText style={[styles.primaryButtonText, { color: backgroundColor }]}>
                      Próximo
                    </ThemedText>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.secondaryButton, { borderColor: tintColor }]}
                  onPress={() => router.back()}
                  disabled={loading}
                >
                  <ThemedText style={[styles.secondaryButtonText, { color: tintColor }]}>
                    Voltar
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  titleText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 48,
  },
  logoButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    borderStyle: 'dashed',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flexGrow: {
    flex: 1,
  },
  numberInput: {
    width: 80,
  },
  stateInput: {
    width: 80,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonSection: {
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
