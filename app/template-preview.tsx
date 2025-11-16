import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme as useRNColorScheme,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { getMockTemplateById } from '@/constants/templates';

export default function TemplatePreviewScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();
  const colorScheme = useRNColorScheme();
  const template = templateId ? getMockTemplateById(templateId) : null;

  if (!template) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Template não encontrado</ThemedText>
      </ThemedView>
    );
  }

  const handleUseTemplate = () => {
    // TODO: Navigate to budget creation screen with template ID
    // For now, just show an alert or navigate back
    console.log('Using template:', template.id);
    // router.push({
    //   pathname: '/budgets/new',
    //   params: { templateId: template.id },
    // });
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <IconSymbol
            name="chevron.left"
            size={28}
            color={Colors[colorScheme ?? 'light'].tint}
          />
          <ThemedText
            style={[styles.backText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            Voltar
          </ThemedText>
        </Pressable>
      </View>

      {/* Template Preview */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Template Info */}
        <View style={styles.templateInfo}>
          <ThemedText type="title" style={styles.templateName}>
            {template.name}
          </ThemedText>
          <ThemedText style={styles.templateDescription}>
            {template.description}
          </ThemedText>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor:
                  colorScheme === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
              },
            ]}>
            <ThemedText style={styles.categoryText}>
              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
            </ThemedText>
          </View>
        </View>

        {/* Full Size Preview */}
        <View
          style={[
            styles.previewContainer,
            { backgroundColor: template.layout.colors.primary },
          ]}>
          <View style={styles.previewContent}>
            <IconSymbol
              name="doc.text.fill"
              size={120}
              color="#ffffff"
              style={styles.previewIcon}
            />
            <ThemedText
              style={[styles.previewText, { color: '#ffffff' }]}>
              Visualização do Template
            </ThemedText>
            <ThemedText
              style={[styles.previewSubtext, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Este é um preview em tela cheia do template selecionado
            </ThemedText>
          </View>

          {/* Color Scheme Preview */}
          <View style={styles.colorScheme}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: template.layout.colors.primary },
              ]}
            />
            <View
              style={[
                styles.colorBox,
                { backgroundColor: template.layout.colors.secondary },
              ]}
            />
            <View
              style={[
                styles.colorBox,
                { backgroundColor: template.layout.colors.accent },
              ]}
            />
          </View>
        </View>

        {/* Template Details */}
        <View style={styles.detailsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Detalhes do Template
          </ThemedText>
          
          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Cores:</ThemedText>
            <ThemedText style={styles.detailText}>
              Primária: {template.layout.colors.primary}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              Secundária: {template.layout.colors.secondary}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              Destaque: {template.layout.colors.accent}
            </ThemedText>
          </View>

          <View style={styles.detailItem}>
            <ThemedText type="defaultSemiBold">Seções:</ThemedText>
            {template.layout.sections.map((section, index) => (
              <ThemedText key={index} style={styles.detailText}>
                • {section.charAt(0).toUpperCase() + section.slice(1)}
              </ThemedText>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <Pressable
          style={[
            styles.button,
            styles.backButtonBottom,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
            },
          ]}
          onPress={handleBack}>
          <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.useButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
          ]}
          onPress={handleUseTemplate}>
          <ThemedText style={styles.useButtonText}>Usar Template</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 17,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  templateInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  templateName: {
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    opacity: 0.8,
  },
  previewContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 400,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  previewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  previewIcon: {
    opacity: 0.9,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  previewSubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
  colorScheme: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  detailsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
    marginLeft: 8,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonBottom: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.3)',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  useButton: {
    flex: 1.5,
  },
  useButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
