import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const router = useRouter();
  const { signIn, loading, error } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = async () => {
    // Clear previous errors
    setFormError('');

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Navigation will be handled by auth state change
      router.replace('/(tabs)/explore');
    } catch {
      // Error is already set in the hook with friendly message
      setFormError(error || 'Não foi possível fazer login.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.content}>

          <View style={styles.headerSection}>
            <View style={[styles.logoPlaceholder, { borderColor: iconColor }]}>
              <ThemedText style={styles.logoText}>LOGO</ThemedText>
            </View>
            <ThemedText type="title" style={[styles.welcomeText, { color: textColor }]}>
              Bem-vindo
            </ThemedText>
            <ThemedText style={[styles.subtitleText, { color: iconColor }]}>
              Faça login para continuar
            </ThemedText>
          </View>

          <View style={styles.formSection}>
            {formError ? (
              <View style={[styles.errorContainer, { backgroundColor: '#fee', borderColor: '#fcc' }]}>
                <ThemedText style={[styles.errorText, { color: '#c00' }]}>
                  {formError}
                </ThemedText>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={[styles.textInput, { 
                  borderColor: iconColor, 
                  color: textColor 
                }]}
                placeholder="Digite seu email"
                placeholderTextColor={iconColor}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Senha</ThemedText>
              <TextInput
                style={[styles.textInput, { 
                  borderColor: iconColor, 
                  color: textColor 
                }]}
                placeholder="Digite sua senha"
                placeholderTextColor={iconColor}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordContainer} 
              onPress={() => router.push('/(public)/forgot-password')}
              disabled={loading}
            >
              <ThemedText style={[styles.forgotPasswordText, { color: tintColor }]}>
                Esqueceu a senha?
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: tintColor, opacity: loading ? 0.7 : 1 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={backgroundColor} />
              ) : (
                <ThemedText style={[styles.loginButtonText, { color: backgroundColor }]}>
                  Entrar
                </ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.registerButton, { borderColor: tintColor }]}
              onPress={() => router.push('/(public)/register')}
              disabled={loading}
            >
              <ThemedText style={[styles.registerButtonText, { color: tintColor }]}>
                Criar conta
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
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
  welcomeText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 32,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonSection: {
    gap: 16,
    marginBottom: 32,
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    
  },
  registerButton: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerSection: {
    marginTop: 'auto',
    paddingBottom: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
});
