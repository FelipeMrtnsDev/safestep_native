import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import { theme } from '../../theme/colors';

export default function OccurrenceScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSave = () => {
    Alert.alert("Sucesso", "Ocorrência registrada com sucesso!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>Nova Ocorrência</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView style={styles.form} contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.label}>Título da Ocorrência</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Queda leve, Remédio atrasado..."
          placeholderTextColor={theme.colors.mutedForeground}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Descreva o que aconteceu..."
          placeholderTextColor={theme.colors.mutedForeground}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Gravidade</Text>
        <View style={styles.severityContainer}>
          <View style={[styles.severityBadge, { backgroundColor: '#BBF7D0' }]}>
            <Text style={{ color: '#15803D', fontWeight: 'bold' }}>Baixa</Text>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: theme.colors.muted }]}>
            <Text style={{ color: theme.colors.mutedForeground }}>Média</Text>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: theme.colors.muted }]}>
            <Text style={{ color: theme.colors.mutedForeground }}>Alta</Text>
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Save size={20} color="#FFF" />
          <Text style={styles.saveButtonText}>Registrar Ocorrência</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60, // Safe Area top
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as ViewStyle,
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  form: { flex: 1 } as ViewStyle,
  label: { fontSize: 14, fontWeight: '600', color: theme.colors.foreground, marginBottom: 8, marginTop: 16 } as TextStyle,
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: theme.colors.foreground,
  } as TextStyle,
  textArea: { minHeight: 120 } as TextStyle,
  severityContainer: { flexDirection: 'row', gap: 12 } as ViewStyle,
  severityBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  } as ViewStyle,
  saveButton: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
    gap: 8,
  } as ViewStyle,
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 } as TextStyle,
});