import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { theme } from '../theme/colors';

// Interface do Deficiente Visual
interface BlindPerson {
  id: string;
  name: string;
  phone: string;
  status: 'online' | 'offline';
}

export default function BlindView() {
  // Estado com os dados (mock)
  const [blindPeople, setBlindPeople] = useState<BlindPerson[]>([
    { id: "1", name: "João Silva", phone: "(11) 99999-1111", status: "online" },
    { id: "2", name: "Maria Santos", phone: "(11) 99999-2222", status: "online" },
    { id: "3", name: "Pedro Costa", phone: "(11) 99999-3333", status: "offline" },
  ]);

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Deficientes Visuais</Text>
          <Text style={styles.headerSubtitle}>Cadastro e gerenciamento</Text>
        </View>
        
        {/* Botão de Adicionar (+) */}
        <Pressable 
          style={({ pressed }) => [
            styles.addButton, 
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={() => console.log("Adicionar novo")}
        >
          <Plus size={24} color={theme.colors.accentForeground} />
        </Pressable>
      </View>

      {/* Lista de Pessoas */}
      <ScrollView 
        style={styles.listContainer}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }} // paddingBottom extra para não cortar o último item
      >
        <View style={styles.listContent}>
          {blindPeople.map((person) => (
            <Pressable 
              key={person.id} 
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: pressed ? theme.colors.muted : theme.colors.card } // Efeito hover
              ]}
            >
              <View style={styles.cardLeft}>
                {/* Avatar / Inicial */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{person.name[0]}</Text>
                </View>
                
                {/* Textos */}
                <View>
                  <Text style={styles.personName}>{person.name}</Text>
                  <Text style={styles.personPhone}>{person.phone}</Text>
                </View>
              </View>

              {/* Bolinha de Status */}
              <View style={[
                styles.statusDot, 
                { backgroundColor: person.status === "online" ? theme.colors.success : '#9CA3AF' }
              ]} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  
  // Header Styles
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  } as TextStyle,
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginTop: 4,
  } as TextStyle,
  addButton: {
    backgroundColor: theme.colors.accent,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  // List Styles
  listContainer: {
    flex: 1,
  } as ViewStyle,
  listContent: {
    gap: 12, // Espaçamento entre itens (substitui space-y-3)
  } as ViewStyle,
  
  // Card Styles
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  } as ViewStyle,
  
  // Avatar Styles
  avatar: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 24, // rounded-full
    backgroundColor: '#EDE9FE', // accent/20 (approx)
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  avatarText: {
    color: theme.colors.accent,
    fontWeight: 'bold',
    fontSize: 18,
  } as TextStyle,
  
  // Text Info Styles
  personName: {
    fontSize: 16,
    fontWeight: '500', // font-medium
    color: theme.colors.foreground,
  } as TextStyle,
  personPhone: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  } as TextStyle,
  
  // Status Dot
  statusDot: {
    width: 12, // w-3
    height: 12, // h-3
    borderRadius: 6, // rounded-full
  } as ViewStyle,
});36w