import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { saveTemplate } from '@/_service/template';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import template1Data from '@/templates/template-1.json';
import type { BudgetTemplate } from '@/types/template';
import { useState } from 'react';

export default function HomeScreen() {
  const [saving, setSaving] = useState(false);

  const handleSaveTemplate = async () => {
    setSaving(true);
    try {
      await saveTemplate(template1Data as BudgetTemplate);
      Alert.alert('Sucesso', 'Template salvo no Firebase!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o template');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Bem-vindo!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Início</ThemedText>
        <ThemedText>
          Você está na página inicial do app Trampo Certo.
        </ThemedText>
        <ThemedText>
          Em breve você poderá gerenciar seus orçamentos e trabalhos por aqui!
        </ThemedText>
      </ThemedView>

      {/* Temporary button to save template */}
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveTemplate}
          disabled={saving}>
          <ThemedText style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Template 1 no Firebase'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
