import { getLogoFromDevice } from '@/_service/cache';
import { getClients } from '@/_service/client';
import { auth } from '@/_service/firebase';
import { DynamicInput } from '@/components/DynamicInput';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { renderTemplate1 } from '@/templates/template-1';
import type { BudgetItem, Client, TemplateField } from '@/types/template';
import { Ionicons } from '@expo/vector-icons';
import { useImageManipulator } from 'expo-image-manipulator';
import * as Print from 'expo-print';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Template Configuration
const TEMPLATE_FIELDS: TemplateField[] = [
  { key: 'service', label: 'Serviço', type: 'text', required: true, placeholder: 'Ex: Desenvolvimento Web' },
  { key: 'items', label: 'Itens / Serviços', type: 'list', required: true },
  { key: 'deadline', label: 'Prazo de Entrega', type: 'date', required: true },
  { key: 'payment', label: 'Condições de Pagamento', type: 'options', required: true, options: ['Pix', 'Cartão Crédito', 'Cartão Débito', 'Boleto'] },
  { key: 'validity', label: 'Validade do Orçamento', type: 'date', required: true },
];

export default function BudgetDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const inputBg = useThemeColor({}, 'background'); // Or a specific input bg color if defined

  const [logoUri, setLogoUri] = useState<string | null>(null);
  const context = useImageManipulator(logoUri || 'placeholder');
  const [loading, setLoading] = useState(false);

  // Form State
  const [budgetName, setBudgetName] = useState('Orçamento');
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Client State
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientList, setShowClientList] = useState(false);

  // Items State (Special handling for list type)
  const [items, setItems] = useState<BudgetItem[]>([]);

  // Filter fields based on params
  const visibleFields = useMemo(() => {
    if (!params.fields) return TEMPLATE_FIELDS;
    const keys = (params.fields as string).split(',');
    // Filter TEMPLATE_FIELDS
    const templateFields = TEMPLATE_FIELDS.filter(f => keys.includes(f.key));

    // Add pseudo-fields for name and client if present in keys
    const extraFields: TemplateField[] = [];
    if (keys.includes('name')) {
      extraFields.push({ key: 'name', label: 'Nome do Orçamento', type: 'text', required: false });
    }
    if (keys.includes('client')) {
      extraFields.push({ key: 'client', label: 'Cliente', type: 'text', required: true });
    }

    return [...extraFields, ...templateFields];
  }, [params.fields]);

  useEffect(() => {
    loadLogo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadClients();
    }, [])
  );

  const loadLogo = async () => {
    try {
      const uri = await getLogoFromDevice();
      setLogoUri(uri);
    } catch (error) {
      console.error('Erro ao carregar logo:', error);
    }
  };

  const loadClients = async () => {
    if (!auth.currentUser) return;
    try {
      const fetchedClients = await getClients(auth.currentUser.uid);
      setClients(fetchedClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const validateForm = () => {
    if (!selectedClient) {
      Alert.alert('Atenção', 'Selecione um cliente.');
      return false;
    }

    for (const field of visibleFields) {
      if (field.required) {
        if (field.type === 'list') {
          if (items.length === 0) {
            Alert.alert('Atenção', `O campo ${field.label} é obrigatório.`);
            return false;
          }
        } else {
          const value = formValues[field.key];
          if (!value || (Array.isArray(value) && value.length === 0)) {
            Alert.alert('Atenção', `O campo ${field.label} é obrigatório.`);
            return false;
          }
        }
      }
    }
    return true;
  };

  const generateHTMLWithLogo = useCallback(async (): Promise<string> => {
    let base64Logo = null;

    if (logoUri && context) {
      try {
        const manipulatedImage = await context.renderAsync();
        const result = await manipulatedImage.saveAsync({ base64: true });
        base64Logo = result.base64;
      } catch (error) {
        console.error('Erro ao processar logo:', error);
      }
    }

    // Format fields for template
    const deadline = formValues['deadline'] instanceof Date
      ? formValues['deadline'].toLocaleDateString('pt-BR')
      : '';

    const validity = formValues['validity'] instanceof Date
      ? formValues['validity'].toLocaleDateString('pt-BR')
      : '';

    const payment = Array.isArray(formValues['payment'])
      ? formValues['payment'].join(', ')
      : formValues['payment'];

    return renderTemplate1({
      title: budgetName,
      service: formValues['service'] || '',
      date: new Date().toLocaleDateString('pt-BR'),
      type: 'Orçamento',
      clientName: selectedClient?.name || '',
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      deadlineDescription: deadline ? `Prazo de entrega: ${deadline}` : '',
      paymentDescription: payment ? `Formas de pagamento: ${payment}` : '',
      startJobDescription: '',
      budgetValidityDescription: validity ? `Válido até: ${validity}` : '',
      phone: selectedClient?.phone || '',
      email: selectedClient?.email || '',
      socialMedia: '',
      logoBase64: base64Logo || undefined,
    });
  }, [logoUri, context, budgetName, formValues, selectedClient, items]);

  const printToFile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const html = await generateHTMLWithLogo();
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 20, paddingTop: insets.top + 20 }
          ]}
        >
          <View style={styles.header}>
            <ThemedText type="title" style={styles.pageTitle}>Detalhes do Orçamento</ThemedText>
          </View>

          {visibleFields.some(f => f.key === 'name') && (
            <View style={[styles.section, { backgroundColor }]}>
              <ThemedText style={styles.label}>Nome do Orçamento</ThemedText>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: iconColor, backgroundColor: inputBg }]}
                value={budgetName}
                onChangeText={setBudgetName}
                placeholderTextColor={iconColor}
              />
            </View>
          )}

          {visibleFields.some(f => f.key === 'client') && (
            <View style={[styles.section, { backgroundColor }]}>
              <ThemedText style={styles.label}>Cliente *</ThemedText>
              {selectedClient ? (
                <View style={[styles.selectedClient, { borderColor: tintColor, backgroundColor: inputBg }]}>
                  <View>
                    <Text style={[styles.clientName, { color: textColor }]}>{selectedClient.name}</Text>
                    <Text style={[styles.clientPhone, { color: iconColor }]}>{selectedClient.phone}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedClient(null)}>
                    <Ionicons name="close-circle" size={24} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={[styles.selectButton, { borderColor: iconColor }]}
                    onPress={() => setShowClientList(!showClientList)}
                  >
                    <ThemedText>Selecionar Cliente</ThemedText>
                    <Ionicons name={showClientList ? "chevron-up" : "chevron-down"} size={20} color={iconColor} />
                  </TouchableOpacity>

                  {showClientList && (
                    <View style={[styles.clientList, { borderColor: iconColor, backgroundColor: inputBg }]}>
                      {clients.map(client => (
                        <TouchableOpacity
                          key={client.id}
                          style={[styles.clientItem, { borderBottomColor: iconColor }]}
                          onPress={() => {
                            setSelectedClient(client);
                            setShowClientList(false);
                          }}
                        >
                          <ThemedText>{client.name}</ThemedText>
                        </TouchableOpacity>
                      ))}
                      <TouchableOpacity
                        style={styles.newClientButton}
                        onPress={() => router.push('/client-modal')}
                      >
                        <Ionicons name="add" size={20} color={tintColor} />
                        <Text style={[styles.newClientText, { color: tintColor }]}>Novo Cliente</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          {/* Dynamic Fields Rendering */}
          {visibleFields.map((field) => {
            if (field.type === 'list') {
              return (
                <View key={field.key} style={[styles.section, { backgroundColor }]}>
                  <View style={styles.sectionHeader}>
                    <ThemedText style={styles.label}>{field.label} {field.required && <Text style={styles.required}>*</Text>}</ThemedText>
                    <TouchableOpacity onPress={addItem}>
                      <Ionicons name="add-circle" size={24} color={tintColor} />
                    </TouchableOpacity>
                  </View>

                  {items.map((item, index) => (
                    <View key={item.id} style={[styles.itemCard, { borderColor: iconColor, backgroundColor: inputBg }]}>
                      <View style={styles.itemHeader}>
                        <Text style={[styles.itemTitle, { color: textColor }]}>Item {index + 1}</Text>
                        <TouchableOpacity onPress={() => removeItem(item.id)}>
                          <Ionicons name="trash-outline" size={20} color="#ff4444" />
                        </TouchableOpacity>
                      </View>

                      <TextInput
                        style={[styles.input, { marginBottom: 8, color: textColor, borderColor: iconColor, backgroundColor: inputBg }]}
                        value={item.description}
                        onChangeText={(text) => updateItem(item.id, 'description', text)}
                        placeholder="Descrição"
                        placeholderTextColor={iconColor}
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                          <Text style={[styles.subLabel, { color: iconColor }]}>Qtd</Text>
                          <TextInput
                            style={[styles.input, { color: textColor, borderColor: iconColor, backgroundColor: inputBg }]}
                            value={item.quantity.toString()}
                            onChangeText={(text) => updateItem(item.id, 'quantity', Number(text))}
                            keyboardType="numeric"
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.subLabel, { color: iconColor }]}>Valor Unit.</Text>
                          <TextInput
                            style={[styles.input, { color: textColor, borderColor: iconColor, backgroundColor: inputBg }]}
                            value={item.unitPrice.toString()}
                            onChangeText={(text) => updateItem(item.id, 'unitPrice', Number(text))}
                            keyboardType="numeric"
                            placeholder="0.00"
                            placeholderTextColor={iconColor}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              );
            }

            return (
              <View key={field.key} style={[styles.section, { backgroundColor }]}>
                <DynamicInput
                  label={field.label}
                  type={field.type}
                  value={formValues[field.key]}
                  onChange={(val) => handleFieldChange(field.key, val)}
                  options={field.options}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </View>
            );
          })}

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.generateButton, { backgroundColor: '#28a745' }, loading && styles.disabledButton]}
              onPress={printToFile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.generateButtonText}>Gerar PDF</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.backButtonFooter, { borderColor: tintColor }]}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={[styles.backButtonText, { color: tintColor }]}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#ff4444',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  clientList: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
  },
  clientItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
  newClientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    gap: 8,
  },
  newClientText: {
    fontWeight: '600',
  },
  selectedClient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientPhone: {
    fontSize: 14,
  },
  itemCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  subLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  footer: {
    marginTop: 20,
  },
  generateButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonFooter: {
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
