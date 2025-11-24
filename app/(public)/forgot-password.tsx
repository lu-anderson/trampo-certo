import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(public)/login");
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Trampo Certo</Text>
          <Text style={styles.subtitle}>Recuperar senha</Text>
        </View>

        {/* FORM */}
        <View style={styles.container}>

          <Text style={styles.description}>
            Digite seu email e enviaremos instruções para redefinir sua senha.
          </Text>

          {/* INPUT */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="seuemail@gmail.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={[styles.primaryButton, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSend}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Enviar email</Text>
            )}
          </TouchableOpacity>

          {/* VOLTAR */}
          <Text style={styles.backText}>
            Lembrou sua senha?{" "}
            <Text
              style={styles.backLink}
              onPress={() => router.push("/(public)/login")}
            >
              Voltar para login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BLUE_700 = "#1D4ED8";
const BLUE_500 = "#3B82F6";

const styles = StyleSheet.create({
  header: {
    backgroundColor: BLUE_700,
    paddingHorizontal: 24,
    paddingVertical: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#e5e7eb",
    marginTop: 6,
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  description: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 26,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "500",
  },
  inputBox: {
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E4E9F2",
    borderRadius: 12,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  primaryButton: {
    backgroundColor: BLUE_700,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  backText: {
    textAlign: "center",
    marginTop: 16,
    color: "#6B7280",
    fontSize: 14,
  },
  backLink: {
    color: BLUE_500,
    fontWeight: "600",
  },
});
