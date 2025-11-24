import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Olá, George 👋</Text>
            <Text style={styles.subHello}>Bem-vindo ao Trampo Certo</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>
        </View>

        {/* CARD NOVO ORÇAMENTO */}
        <TouchableOpacity
          style={styles.bigCard}
          onPress={() => router.push("/company-info")}
        >
          <Text style={styles.bigCardTitle}>Criar orçamento</Text>
          <Text style={styles.bigCardSubtitle}>
            Gere um orçamento profissional em segundos
          </Text>
        </TouchableOpacity>

        {/* MODELOS PRONTOS */}
        <Text style={styles.sectionTitle}>Modelos prontos</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.modelCard}>
            <Text style={styles.modelTitle}>Reformas</Text>
            <Text style={styles.modelSubtitle}>Modelo rápido e completo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modelCard}>
            <Text style={styles.modelTitle}>Pintura</Text>
            <Text style={styles.modelSubtitle}>Perfeito para serviços menores</Text>
          </TouchableOpacity>
        </View>

        {/* AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações rápidas</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/company-info")}
          >
            <Text style={styles.quickText}>Criar orçamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/templates")}
          >
            <Text style={styles.quickText}>Ver templates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/explore")}
          >
            <Text style={styles.quickText}>Explorar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/settings")}
          >
            <Text style={styles.quickText}>Configurações</Text>
          </TouchableOpacity>
        </View>

        {/* ÚLTIMOS ORÇAMENTOS */}
        <Text style={styles.sectionTitle}>Últimos orçamentos</Text>

        <View style={styles.listCard}>
          <View>
            <Text style={styles.listTitle}>Orçamento #1</Text>
            <Text style={styles.listSubtitle}>Criado há 2 dias</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.open}>Abrir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listCard}>
          <View>
            <Text style={styles.listTitle}>Orçamento #2</Text>
            <Text style={styles.listSubtitle}>Criado há 2 dias</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.open}>Abrir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listCard}>
          <View>
            <Text style={styles.listTitle}>Orçamento #3</Text>
            <Text style={styles.listSubtitle}>Criado há 2 dias</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.open}>Abrir</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    alignItems: "center",
  },
  hello: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  subHello: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  bigCard: {
    backgroundColor: "#ffffff10",
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },
  bigCardTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 6,
  },
  bigCardSubtitle: {
    color: "#aaa",
    fontSize: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  modelCard: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  modelTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  modelSubtitle: {
    color: "#aaa",
    fontSize: 13,
    lineHeight: 17,
  },

  quickButton: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  quickText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  listCard: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  listSubtitle: {
    color: "#777",
    fontSize: 13,
    marginTop: 3,
  },
  open: {
    color: "#4CD964",
    fontWeight: "700",
    fontSize: 15,
  },
});
