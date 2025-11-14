import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const router = useRouter();
  const { resetPassword, loading } = useAuthActions();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {
      email: '',
    };

    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    // Clear previous messages
    setErrors({ email: '' });
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await resetPassword(email);
      setSuccessMessage('Email enviado! Verifique sua caixa de entrada para redefinir sua senha.');
      setEmail('');
    } catch (e: any) {
      // Error message is already translated to Portuguese by AuthService
      setErrors({ email: e.message || 'Não foi possível enviar o email de recuperação.' });
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
              Recuperar Senha
            </ThemedText>
            <ThemedText style={[styles.subtitleText, { color: iconColor }]}>
              Digite seu email para receber instruções
            </ThemedText>
          </View>

          <View style={styles.formSection}>
            {successMessage ? (
              <View style={[styles.successContainer, { backgroundColor: '#efe', borderColor: '#cfc' }]}>
                <ThemedText style={[styles.successText, { color: '#0a0' }]}>
                  {successMessage}
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
              {errors.email ? (
                <ThemedText style={styles.errorText}>
                  {errors.email}
                </ThemedText>
              ) : null}
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={[styles.resetButton, { backgroundColor: tintColor, opacity: loading ? 0.7 : 1 }]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={backgroundColor} />
              ) : (
                <ThemedText style={[styles.resetButtonText, { color: backgroundColor }]}>
                  Enviar Email
                </ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.backButton, { borderColor: tintColor }]}
              onPress={() => router.back()}
              disabled={loading}
            >
              <ThemedText style={[styles.backButtonText, { color: tintColor }]}>
                Voltar
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
  successContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  successText: {
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
  resetButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  resetButtonText: {
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
