import { createClient } from '@/_service/client';
import { auth } from '@/_service/firebase';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatPhone, validatePhone } from '@/utils/validation';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ClientModalScreen() {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const handleSave = async () => {
    let hasError = false;
    const newErrors = { name: '', phone: '' };

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      hasError = true;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
      hasError = true;
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Telefone inválido';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (!auth.currentUser) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      await createClient(auth.currentUser.uid, {
        name,
        phone,
        isWhatsapp,
        email,
      });
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar cliente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="subtitle">Novo Cliente</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Nome *</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: errors.name ? '#ff4444' : '#ddd' }]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors({ ...errors, name: '' });
              }}
              placeholder="Nome do cliente"
              placeholderTextColor={iconColor}
            />
            {errors.name ? <ThemedText style={styles.errorText}>{errors.name}</ThemedText> : null}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Telefone *</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: errors.phone ? '#ff4444' : '#ddd' }]}
              value={phone}
              onChangeText={(text) => {
                setPhone(formatPhone(text));
                setErrors({ ...errors, phone: '' });
              }}
              placeholder="(00) 00000-0000"
              placeholderTextColor={iconColor}
              keyboardType="phone-pad"
            />
            {errors.phone ? <ThemedText style={styles.errorText}>{errors.phone}</ThemedText> : null}
          </View>

          <View style={styles.switchContainer}>
            <ThemedText style={styles.label}>É WhatsApp?</ThemedText>
            <Switch
              value={isWhatsapp}
              onValueChange={setIsWhatsapp}
              trackColor={{ false: '#767577', true: tintColor }}
              thumbColor={isWhatsapp ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email (Opcional)</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: '#ddd' }]}
              value={email}
              onChangeText={setEmail}
              placeholder="email@exemplo.com"
              placeholderTextColor={iconColor}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tintColor }]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar Cliente</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
});
