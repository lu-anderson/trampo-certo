import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuthActions } from '@/hooks/use-auth-actions';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const router = useRouter();
  const { signUp, loading, error } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Basic validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/explore'),
        },
      ]);
    } catch {
      Alert.alert('Erro no cadastro', error || 'Não foi possível criar a conta.');
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
              Criar Conta
            </ThemedText>
            <ThemedText style={[styles.subtitleText, { color: iconColor }]}>
              Preencha os dados para começar
            </ThemedText>
          </View>

          <View style={styles.formSection}>
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
                placeholder="Digite sua senha (mín. 6 caracteres)"
                placeholderTextColor={iconColor}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Confirmar Senha</ThemedText>
              <TextInput
                style={[styles.textInput, { 
                  borderColor: iconColor, 
                  color: textColor 
                }]}
                placeholder="Confirme sua senha"
                placeholderTextColor={iconColor}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={[styles.registerButton, { backgroundColor: tintColor, opacity: loading ? 0.7 : 1 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={backgroundColor} />
              ) : (
                <ThemedText style={[styles.registerButtonText, { color: backgroundColor }]}>
                  Criar Conta
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
