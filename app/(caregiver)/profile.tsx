import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { LogOut, Edit2 } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/colors';

export default function ProfileScreen() {
  const { userName, userEmail, logout } = useAuth();

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>

        {/* Content Scrollable */}
        <ScrollView style={styles.content} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {firstLetter}
              </Text>
            </View>
            <Text style={styles.profileName}>{userName || "Usuário"}</Text>
            <Text style={styles.profileRole}>Cuidador Profissional</Text>
          </View>

          {/* Info Cards Section */}
          <View style={styles.infoSection}>
            {/* Card Email */}
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Email</Text>
              <Text style={styles.cardValue}>{userEmail || "email@exemplo.com"}</Text>
            </View>

            {/* Card Telefone */}
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Telefone</Text>
              <Text style={styles.cardValue}>(11) 99999-0000</Text>
            </View>

            {/* Card Deficientes */}
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Deficientes sob Cuidado</Text>
              <Text style={styles.cardValue}>3 pessoas</Text>
            </View>

            {/* Card Status */}
            <View style={styles.infoCard}>
              <Text style={styles.cardLabel}>Status</Text>
              <Text style={[styles.cardValue, { color: theme.colors.success }]}>Online e disponível</Text>
            </View>
          </View>
        </ScrollView>

        {/* Actions Footer (Fixed at bottom) */}
        <View style={styles.footer}>
          {/* Botão de Editar */}
          

          {/* Botão de Logout */}
          <Pressable style={styles.logoutButton} onPress={logout}>
            <LogOut size={18} color={theme.colors.destructive} />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  flexContainer: {
    flex: 1,
  } as ViewStyle,
  header: {
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    padding: 16,
  } as ViewStyle,
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  } as TextStyle,
  content: {
    flex: 1,
  } as ViewStyle,

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  } as ViewStyle,
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EDE9FE', // Roxo bem claro
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: theme.colors.muted,
  } as ViewStyle,
  avatarText: {
    color: theme.colors.accent,
    fontSize: 36,
    fontWeight: 'bold',
  } as TextStyle,
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  } as TextStyle,
  profileRole: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  } as TextStyle,

  // Info Cards
  infoSection: {
    gap: 16,
    marginBottom: 32,
  } as ViewStyle,
  infoCard: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  cardLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  } as TextStyle,
  cardValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.foreground,
  } as TextStyle,

  // Footer Actions
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    gap: 12,
  } as ViewStyle,
  editButton: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  } as ViewStyle,
  editButtonText: {
    color: theme.colors.accentForeground,
    fontWeight: 'bold',
    fontSize: 16,
  } as TextStyle,
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.destructive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  } as ViewStyle,
  logoutButtonText: {
    color: theme.colors.destructive,
    fontWeight: 'bold',
    fontSize: 16,
  } as TextStyle,
});