import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTemplateById } from '@/_service/template';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import type { BudgetTemplate } from '@/types/template';

export default function TemplatePreviewScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();
  const colorScheme = useRNColorScheme();
  const [template, setTemplate] = useState<BudgetTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadTemplate();
  }, [templateId]);

  const loadTemplate = async () => {
    if (!templateId) return;

    try {
      setLoading(true);
      const fetchedTemplate = await getTemplateById(templateId);
      setTemplate(fetchedTemplate);
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = () => {
    if (!template) return;

    console.log('Using template:', template.id);
    // Pass templateId and required company info fields
    const requiredFields = template.companyInfoFields.join(',');
    router.push(`/company-info?templateId=${template.id}&required=${requiredFields}`);
  };

  const openFullImage = () => {
    setShowFullImage(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  const closeFullImage = () => {
    Animated.spring(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
    // Hide modal immediately to avoid lingering black background
    setTimeout(() => {
      setShowFullImage(false);
    }, 200);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.loadingText}>Carregando template...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!template) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Template não encontrado</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemedView style={styles.content}>
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

          {/* Image Preview with Tap Instruction */}
          <Pressable onPress={openFullImage} style={styles.imagePreviewContainer}>
            {template.thumbnailUrl && (
              <View style={styles.imageWrapper}>
                <Image
                  source={typeof template.thumbnailUrl === 'number' ? template.thumbnailUrl : { uri: template.thumbnailUrl }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.overlayGradient} />
              </View>
            )}
            <View style={styles.tapInstructionContainer}>
              <IconSymbol
                name="hand.tap.fill"
                size={20}
                color={Colors[colorScheme ?? 'light'].tint}
                style={styles.tapIcon}
              />
              <ThemedText style={styles.tapInstruction}>
                Toque na imagem para visualizar em tela cheia
              </ThemedText>
            </View>
          </Pressable>

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
              <ThemedText type="defaultSemiBold">Campos do Orçamento:</ThemedText>
              {template.fields.map((field, index) => (
                <ThemedText key={index} style={styles.detailText}>
                  • {field.label}
                </ThemedText>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={[
          styles.bottomActions,
          { backgroundColor: colorScheme === 'dark' ? '#151718' : '#fff' }
        ]}>
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
            onPress={router.back}>
            <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              styles.useButton,
              {
                backgroundColor: colorScheme === 'dark'
                  ? '#0a7ea4'  // Use light mode tint color for visibility in dark mode
                  : Colors[colorScheme ?? 'light'].tint
              },
            ]}
            onPress={handleUseTemplate}>
            <ThemedText style={[
              styles.useButtonText,
              { color: '#ffffff' }
            ]}>Usar Template</ThemedText>
          </Pressable>
        </View>

        {/* Full Screen Image Modal */}
        <Modal
          visible={showFullImage}
          transparent
          animationType="none"
          onRequestClose={closeFullImage}>
          <Pressable
            style={styles.modalOverlay}
            onPress={closeFullImage}
          >
            {/* Close Button */}
            <Pressable
              style={styles.closeButton}
              onPress={closeFullImage}>
              <IconSymbol
                name="xmark"
                size={24}
                color="#ffffff"
              />
            </Pressable>

            <Animated.View
              style={[
                styles.fullImageContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: scaleAnim,
                },
              ]}>
              {template.thumbnailUrl && (
                <Image
                  source={typeof template.thumbnailUrl === 'number' ? template.thumbnailUrl : { uri: template.thumbnailUrl }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              )}
            </Animated.View>
          </Pressable>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
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
  imagePreviewContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
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
  imageWrapper: {
    height: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    top: 0,
    left: 0,
  },
  overlayGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
  },
  tapInstructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
  tapIcon: {
    opacity: 0.7,
  },
  tapInstruction: {
    fontSize: 13,
    opacity: 0.7,
    fontStyle: 'italic',
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
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageContainer: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
