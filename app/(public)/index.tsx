import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const router = useRouter();
  const { signIn, loading } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let isValid = true;

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    setErrors({ email: '', password: '' });
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    try {
      await signIn(email, password);
      // Navigation will be handled by auth state change
      router.replace('/(tabs)/explore');
    } catch (e: any) {
      setGeneralError(e.message || 'Não foi possível fazer login.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1A54D4" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={[styles.safeArea, { backgroundColor: '#1A54D4' }]} edges={['top']}>
          {/* Blue Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <ThemedText style={styles.headerTitle} type='title'>Trampo Certo</ThemedText>
              <ThemedText style={styles.headerSubtitle}>Entre na sua conta</ThemedText>
            </View>
          </View>

          {/* White Form Section */}
          <View style={[styles.formContainer, { backgroundColor }]}>
            <View style={styles.formContent}>
              {/* Email Input */}
              <View style={styles.inputSection}>
                <ThemedText style={[styles.inputLabel, { color: textColor }]}>Email</ThemedText>
                <View style={[styles.emailInputContainer, { backgroundColor: '#F5F7FA' }]}>
                  <TextInput
                    style={[styles.emailInput, {
                      color: iconColor,
                    }]}
                    placeholder="seuemail@gmail.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                  />
                </View>
                {errors.email ? (
                  <ThemedText style={styles.errorText}>
                    {errors.email}
                  </ThemedText>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputSection}>
                <ThemedText style={[styles.inputLabel, { color: textColor }]}>Senha</ThemedText>
                <View style={[styles.passwordInputContainer, { backgroundColor: '#F5F7FA' }]}>
                  <TextInput
                    style={[styles.passwordInput, {
                      color: textColor
                    }]}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
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
                  <ThemedText style={styles.errorText}>
                    {errors.password}
                  </ThemedText>
                ) : null}
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.push('/(public)/forgot-password')}
                disabled={loading}
              >
                <ThemedText style={[styles.forgotPasswordText, { color: tintColor }]}>
                  Esqueceu sua senha?
                </ThemedText>
              </TouchableOpacity>

              {/* Error Message */}
              {generalError ? (
                <ThemedText style={styles.errorText}>
                  {generalError}
                </ThemedText>
              ) : null}

              {/* Continue Button */}
              <TouchableOpacity
                style={[styles.continueButton, {
                  backgroundColor: tintColor,
                  opacity: loading ? 0.7 : 1
                }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <ThemedText style={styles.continueButtonText}>Continuar</ThemedText>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <ThemedText style={[styles.registerText, { color: iconColor }]}>
                  Não tem uma conta?{' '}
                </ThemedText>
                <TouchableOpacity
                  onPress={() => router.push('/(public)/register')}
                  disabled={loading}
                >
                  <ThemedText style={[styles.registerLink, { color: tintColor }]}>
                    Criar conta
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: '#e5e7eb' }]} />
                <ThemedText style={[styles.dividerText, { color: iconColor }]}>OU</ThemedText>
                <View style={[styles.divider, { backgroundColor: '#e5e7eb' }]} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtons}>
                {/* Google Button */}
                <TouchableOpacity
                  style={styles.socialButton}
                  disabled={loading}
                >
                  <View style={styles.socialButtonContent}>
                    <Ionicons name="logo-google" size={20} color="#2368E6" />
                    <ThemedText style={[styles.socialButtonText, { color: textColor }]}>
                      Continuar com Google
                    </ThemedText>
                  </View>
                </TouchableOpacity>

                {/* Apple Button */}
                <TouchableOpacity
                  style={styles.socialButton}
                  disabled={loading}
                >
                  <View style={styles.socialButtonContent}>
                    <Ionicons name="logo-apple" size={20} color="#000000" />
                    <ThemedText style={[styles.socialButtonText, { color: textColor }]}>
                      Continuar com Apple
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  header: {
    backgroundColor: '#FFF',
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 70,
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  formContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8ECF4',
    backgroundColor: '#F5F7FA',
  },
  emailInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    minHeight: 48,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8ECF4',
    backgroundColor: '#F5F7FA',
  },
  passwordInput: {
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
  forgotPasswordContainer: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginBottom: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: '#E8ECF4',
    backgroundColor: '#F5F7FA',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,

  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
