import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1A54D4" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={[styles.safeArea, { backgroundColor: '#1A54D4' }]} edges={['top']}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Blue Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <ThemedText style={styles.headerTitle} type='title'>Trampo Certo</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Crie sua conta</ThemedText>
              </View>
            </View>

            {/* White Form Section */}
            <View style={[styles.formContainer, { backgroundColor }]}>
              <View style={styles.formContent}>

                {/* Name Input */}
                <View style={styles.inputSection}>
                  <ThemedText style={[styles.inputLabel, { color: textColor }]}>Nome</ThemedText>
                  <View style={[styles.inputContainer, { backgroundColor: '#F5F7FA' }]}>
                    <TextInput
                      style={[styles.textInput, {
                        color: textColor
                      }]}
                      placeholder="Seu nome"
                      placeholderTextColor="#9ca3af"
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        if (errors.name) {
                          setErrors({ ...errors, name: '' });
                        }
                      }}
                      autoCapitalize="words"
                      autoCorrect={false}
                      editable={!loading}
                    />
                  </View>
                  {errors.name ? (
                    <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
                  ) : null}
                </View>

                {/* Email Input */}
                <View style={styles.inputSection}>
                  <ThemedText style={[styles.inputLabel, { color: textColor }]}>Email</ThemedText>
                  <View style={[styles.inputContainer, { backgroundColor: '#F5F7FA' }]}>
                    <TextInput
                      style={[styles.textInput, {
                        color: textColor
                      }]}
                      placeholder="seuemail@gmail.com"
                      placeholderTextColor="#9ca3af"
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
                      editable={!loading}
                    />
                  </View>
                  {errors.email ? (
                    <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
                  ) : null}
                </View>

                {/* Password Input */}
                <View style={styles.inputSection}>
                  <ThemedText style={[styles.inputLabel, { color: textColor }]}>Senha</ThemedText>
                  <View style={[styles.inputContainer, { backgroundColor: '#F5F7FA' }]}>
                    <TextInput
                      style={[styles.textInput, {
                        color: textColor
                      }]}
                      placeholder="Crie uma senha"
                      placeholderTextColor="#9ca3af"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) {
                          setErrors({ ...errors, password: '' });
                        }
                      }}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color={iconColor}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password ? (
                    <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
                  ) : null}
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputSection}>
                  <ThemedText style={[styles.inputLabel, { color: textColor }]}>Confirmar senha</ThemedText>
                  <View style={[styles.inputContainer, { backgroundColor: '#F5F7FA' }]}>
                    <TextInput
                      style={[styles.textInput, {
                        color: textColor
                      }]}
                      placeholder="Repita a senha"
                      placeholderTextColor="#9ca3af"
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword) {
                          setErrors({ ...errors, confirmPassword: '' });
                        }
                      }}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                    />
                    {/* No eye button for confirm password in the design, but good UX to have? 
                         The design doesn't explicitly show it for confirm, but usually it's there. 
                         I'll leave it out for confirm to match the image strictly if needed, 
                         but the image only shows the password field having it. 
                         Wait, the image shows "Senha" with eye, and "Confirmar senha" without eye?
                         Actually, standard practice is to have it. But I will follow the image.
                         The image shows "Senha" with the eye icon. "Confirmar senha" is below it.
                         I will add it if it makes sense, but let's stick to the image.
                         Actually, let's just not add it to confirm password to be safe with "igual a imagem".
                     */}
                  </View>
                  {errors.confirmPassword ? (
                    <ThemedText style={styles.errorText}>{errors.confirmPassword}</ThemedText>
                  ) : null}
                </View>

                <View style={styles.buttonSection}>
                  {signUpError ? (
                    <ThemedText style={styles.errorText}>
                      {signUpError}
                    </ThemedText>
                  ) : null}

                  <TouchableOpacity
                    style={[styles.registerButton, { backgroundColor: tintColor }]}
                    onPress={handleRegister}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={backgroundColor} />
                    ) : (
                      <ThemedText style={[styles.registerButtonText, { color: '#ffffff' }]}>
                        Criar conta
                      </ThemedText>
                    )}
                  </TouchableOpacity>

                  <View style={styles.loginContainer}>
                    <ThemedText style={[styles.loginText, { color: iconColor }]}>
                      Já tem uma conta?{' '}
                    </ThemedText>
                    <TouchableOpacity
                      onPress={() => router.back()}
                      disabled={loading}
                    >
                      <ThemedText style={[styles.loginLink, { color: tintColor }]}>
                        Entrar
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
    backgroundColor: '#1A54D4', // Match header background for overscroll
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#FFF',
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 40, // Adjusted for spacing
    paddingBottom: 40,
    backgroundColor: '#1A54D4',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  formContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8ECF4',
    backgroundColor: '#F5F7FA',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    minHeight: 48,
  },
  eyeButton: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonSection: {
    marginTop: 12,
    gap: 16,
  },
  registerButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
