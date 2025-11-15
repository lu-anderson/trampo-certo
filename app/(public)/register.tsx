import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const { signUp, loading, error: signUpError } = useAuthActions();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    await signUp(email, password, name);
    
    Alert.alert(
      'Sucesso!',
      'Cadastro realizado com sucesso. Bem-vindo ao Trampo Certo!',
      [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (signUpError) {
      Alert.alert(
        'Erro no cadastro',
        signUpError,
        [{ text: 'OK' }]
      );
    }
  }, [signUpError]);


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
                <View style={[styles.logoPlaceholder, { borderColor: iconColor }]}>
                  <ThemedText style={styles.logoText}>LOGO</ThemedText>
                </View>
                <ThemedText type="title" style={[styles.titleText, { color: textColor }]}>
                  Criar conta
                </ThemedText>
                <ThemedText style={[styles.subtitleText, { color: iconColor }]}>
                  Preencha os dados para se cadastrar
                </ThemedText>
              </View>

              <View style={styles.formSection}>
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>Nome (Pessoal/Empresa)</ThemedText>
                  <TextInput
                    style={[styles.textInput, { 
                      borderColor: errors.name ? '#ff4444' : iconColor, 
                      color: textColor 
                    }]}
                    placeholder="Digite seu nome ou nome da empresa"
                    placeholderTextColor={iconColor}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (errors.name) {
                        setErrors({ ...errors, name: '' });
                      }
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errors.name ? (
                    <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>Email</ThemedText>
                  <TextInput
                    style={[styles.textInput, { 
                      borderColor: errors.email ? '#ff4444' : iconColor, 
                      color: textColor 
                    }]}
                    placeholder="Digite seu email"
                    placeholderTextColor={iconColor}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.email ? (
                    <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>Senha</ThemedText>
                  <TextInput
                    style={[styles.textInput, { 
                      borderColor: errors.password ? '#ff4444' : iconColor, 
                      color: textColor 
                    }]}
                    placeholder="Digite sua senha"
                    placeholderTextColor={iconColor}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors({ ...errors, password: '' });
                      }
                    }}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.password ? (
                    <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <ThemedText style={styles.inputLabel}>Confirmar Senha</ThemedText>
                  <TextInput
                    style={[styles.textInput, { 
                      borderColor: errors.confirmPassword ? '#ff4444' : iconColor, 
                      color: textColor 
                    }]}
                    placeholder="Digite sua senha novamente"
                    placeholderTextColor={iconColor}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: '' });
                      }
                    }}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.confirmPassword ? (
                    <ThemedText style={styles.errorText}>{errors.confirmPassword}</ThemedText>
                  ) : null}
                </View>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity 
                  style={[styles.registerButton, { backgroundColor: tintColor }]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={backgroundColor} />
                  ) : (
                    <ThemedText style={[styles.registerButtonText, { color: backgroundColor }]}>
                      Cadastrar
                    </ThemedText>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.backButton, { borderColor: tintColor }]}
                  onPress={() => router.back()}
                  disabled={loading}
                >
                  <ThemedText style={[styles.backButtonText, { color: tintColor }]}>
                    Voltar para login
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
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
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
  registerButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
