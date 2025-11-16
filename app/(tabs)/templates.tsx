import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useColorScheme as useRNColorScheme,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { getMockTemplates } from '@/constants/templates';
import type { BudgetTemplate } from '@/types/template';

export default function TemplatesScreen() {
  const colorScheme = useRNColorScheme();
  const templates = getMockTemplates();

  const handleTemplatePress = (template: BudgetTemplate) => {
    router.push({
      pathname: '/template-preview',
      params: { templateId: template.id },
    });
  };

  const renderTemplateCard = ({ item }: { item: BudgetTemplate }) => {
    const backgroundColor = colorScheme === 'dark' ? '#1e1e1e' : '#ffffff';
    const borderColor = colorScheme === 'dark' ? '#333' : '#e5e5e5';

    return (
      <Pressable
        style={({ pressed }) => [
          styles.templateCard,
          { backgroundColor, borderColor },
          pressed && styles.templateCardPressed,
        ]}
        onPress={() => handleTemplatePress(item)}>
        {/* Template Preview Box */}
        <View
          style={[
            styles.previewBox,
            { backgroundColor: item.layout.colors.primary },
          ]}>
          <IconSymbol
            name="doc.text.fill"
            size={48}
            color="#ffffff"
            style={styles.previewIcon}
          />
        </View>

        {/* Template Info */}
        <View style={styles.templateInfo}>
          <ThemedText type="defaultSemiBold" style={styles.templateName}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.templateDescription}>
            {item.description}
          </ThemedText>

          {/* Category Badge */}
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
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </ThemedText>
          </View>
        </View>

        {/* Arrow Icon */}
        <IconSymbol
          name="chevron.right"
          size={24}
          color={Colors[colorScheme ?? 'light'].icon}
          style={styles.arrowIcon}
        />
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Templates
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Escolha um template para seu orçamento
        </ThemedText>
      </View>

      {/* Templates List */}
      <FlatList
        data={templates}
        renderItem={renderTemplateCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  templateCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  previewBox: {
    width: 80,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewIcon: {
    opacity: 0.8,
  },
  templateInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  templateName: {
    fontSize: 18,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    opacity: 0.8,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
