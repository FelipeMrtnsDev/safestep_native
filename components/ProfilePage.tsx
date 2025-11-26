import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ViewStyle, TextStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOut, Edit2 } from 'lucide-react-native';
import { theme } from '../theme/colors';

interface ProfilePageProps {
  onLogout: () => void;
}

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const name = await AsyncStorage.getItem("userName") || "Usuário";
      const email = await AsyncStorage.getItem("userEmail") || "usuario@email.com";
      setUserName(name);
      setUserEmail(email);
    };
    loadData();
  }, []);

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      {/* Profile Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16 }}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{firstLetter}</Text>
          </View>
          <Text style={styles.nameText}>{userName}</Text>
          <Text style={styles.roleText}>Cuidador Profissional</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.cardLabel}>Email</Text>
            <Text style={styles.cardValue}>{userEmail}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardLabel}>Telefone</Text>
            <Text style={styles.cardValue}>(11) 99999-0000</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardLabel}>Deficientes sob Cuidado</Text>
            <Text style={styles.cardValue}>3 pessoas</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardLabel}>Status</Text>
            <Text style={[styles.cardValue, { color: '#16A34A' }]}>Online e disponível</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Pressable onPress={onLogout} style={styles.logoutButton}>
            <LogOut size={18} color={theme.colors.destructive} />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card } as ViewStyle,
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  content: { flex: 1 } as ViewStyle,
  
  // Avatar
  avatarContainer: { alignItems: 'center', marginBottom: 24 } as ViewStyle,
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EDE9FE', alignItems: 'center', justifyContent: 'center', marginBottom: 16 } as ViewStyle, // bg-accent/20 approx
  avatarLetter: { fontSize: 32, fontWeight: 'bold', color: theme.colors.accent } as TextStyle,
  nameText: { fontSize: 20, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  roleText: { fontSize: 14, color: theme.colors.mutedForeground } as TextStyle,

  // Cards
  cardsContainer: { gap: 16, marginBottom: 24 } as ViewStyle,
  infoCard: { backgroundColor: theme.colors.muted, borderRadius: 8, padding: 16 } as ViewStyle,
  cardLabel: { fontSize: 12, color: theme.colors.mutedForeground, textTransform: 'uppercase', fontWeight: '600', marginBottom: 4 } as TextStyle,
  cardValue: { fontSize: 16, fontWeight: '500', color: theme.colors.foreground } as TextStyle,

  // Actions
  actionsContainer: { paddingTop: 16, borderTopWidth: 1, borderTopColor: theme.colors.border, gap: 12 } as ViewStyle,
  editButton: { backgroundColor: theme.colors.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, gap: 8 } as ViewStyle,
  editButtonText: { color: theme.colors.accentForeground, fontWeight: '500', fontSize: 16 } as TextStyle,
  logoutButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.destructive, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, gap: 8 } as ViewStyle,
  logoutButtonText: { color: theme.colors.destructive, fontWeight: '500', fontSize: 16 } as TextStyle,
});