import { useThemeColor } from '@/hooks/use-theme-color';
import type { FieldType } from '@/types/template';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface DynamicInputProps {
  label: string;
  type: FieldType;
  value: any;
  onChange: (value: any) => void;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export function DynamicInput({
  label,
  type,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
}: DynamicInputProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'icon'); // Using icon color for borders/placeholders

  // Ensure value is treated correctly for options
  const selectedOptions = Array.isArray(value) ? value : (value ? [value] : []);

  const renderInput = () => {
    switch (type) {
      case 'options':
        return (
          <View style={styles.optionsContainer}>
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option);

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionChip,
                    { backgroundColor: isSelected ? '#e6f2ff' : backgroundColor, borderColor: isSelected ? '#007bff' : borderColor },
                    isSelected && styles.optionChipSelected
                  ]}
                  onPress={() => {
                    if (isSelected) {
                      onChange(selectedOptions.filter(v => v !== option));
                    } else {
                      onChange([...selectedOptions, option]);
                    }
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    { color: isSelected ? '#007bff' : textColor },
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 'date':
        const dateValue = value instanceof Date ? value : new Date();
        return (
          <View>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor, borderColor }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: textColor }]}>
                {value instanceof Date ? value.toLocaleDateString('pt-BR') : 'Selecionar Data'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={textColor} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
                minimumDate={new Date()}
              />
            )}
          </View>
        );

      case 'list':
        // List handling is complex, usually handled by parent or specialized component
        // For simple text list:
        return (
          <View>
            <Text style={[styles.helperText, { color: textColor }]}>Lista de itens (gerenciado externamente)</Text>
          </View>
        )

      case 'money':
        return (
          <TextInput
            style={[styles.input, { color: textColor, backgroundColor, borderColor }]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder || "R$ 0,00"}
            placeholderTextColor={borderColor}
            keyboardType="numeric"
          />
        );

      case 'text':
      default:
        return (
          <TextInput
            style={[styles.input, { color: textColor, backgroundColor, borderColor }]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder || 'Digite aqui...'}
            placeholderTextColor={borderColor}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {renderInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionChipSelected: {
    backgroundColor: '#e6f2ff',
    borderColor: '#007bff',
  },
  optionText: {
    // color handled dynamically
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    fontStyle: 'italic'
  }
});
