import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthActions } from "@/hooks/use-auth-actions";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, loading } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Preencha email e senha.");
      return;
    }

    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)");
    } catch (err) {
      alert("Email ou senha inválidos.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Trampo Certo</Text>
          <Text style={styles.subtitle}>Entre na sua conta</Text>
        </View>

        {/* FORM */}
        <View style={styles.content}>
          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="seuemail@gmail.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(public)/forgot-password")}
          >
            <Text style={styles.forgot}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          {/* BOTÃO LOGIN */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryText}>
              {loading ? "Entrando..." : "Continuar"}
            </Text>
          </TouchableOpacity>

          {/* CRIAR CONTA */}
          <Text style={styles.registerText}>
            Não tem uma conta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => router.push("/(public)/register")}
            >
              Criar conta
            </Text>
          </Text>

          {/* DIVISOR */}
          <View style={styles.dividerBox}>
            <View style={styles.line} />
            <Text style={styles.or}>OU</Text>
            <View style={styles.line} />
          </View>

          {/* SOCIAL LOGIN */}
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#2563EB" />
            <Text style={styles.socialText}>Continuar com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialText}>Continuar com Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-microsoft" size={20} color="#2563EB" />
            <Text style={styles.socialText}>Continuar com Microsoft</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------- */
/*       ESTILOS          */
/* ---------------------- */

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

  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
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
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  forgot: {
    color: BLUE_500,
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: BLUE_700,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  registerText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#6B7280",
  },

  registerLink: {
    color: BLUE_500,
    fontWeight: "600",
  },

  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  or: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 14,
  },

  socialButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F5F7FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  socialText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
});
