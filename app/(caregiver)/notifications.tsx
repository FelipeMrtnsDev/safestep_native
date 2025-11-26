import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, AlertTriangle, Info, Check } from 'lucide-react-native';
import { theme } from '../../theme/colors';

// Tipo de Notificação
interface NotificationItem {
  id: string;
  type: 'emergency' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();

  // Mock de dados simulando que o deficiente acionou a emergência
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'EMERGÊNCIA ACIONADA',
      message: 'João Silva solicitou ajuda urgente através do botão de pânico.',
      time: 'Agora',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Relatório Diário',
      message: 'O relatório de atividades de ontem já está disponível.',
      time: '2 horas atrás',
      read: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Bateria Baixa',
      message: 'O dispositivo de Maria Santos está com 15% de bateria.',
      time: '5 horas atrás',
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16 }}>
        {notifications.map((item) => (
          <Pressable 
            key={item.id} 
            style={[
              styles.notificationCard, 
              item.read ? styles.cardRead : styles.cardUnread,
              item.type === 'emergency' && !item.read ? styles.cardEmergency : {}
            ]}
            onPress={() => handleMarkAsRead(item.id)}
          >
            {/* Ícone Lateral */}
            <View style={[
              styles.iconContainer,
              item.type === 'emergency' ? styles.iconEmergency : styles.iconInfo
            ]}>
              {item.type === 'emergency' ? (
                <AlertTriangle size={24} color={item.type === 'emergency' ? '#DC2626' : theme.colors.accent} />
              ) : (
                <Info size={24} color={theme.colors.accent} />
              )}
            </View>

            {/* Texto */}
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeader}>
                <Text style={[
                  styles.cardTitle,
                  item.type === 'emergency' ? { color: '#DC2626' } : {}
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
              
              {!item.read && (
                <Text style={styles.clickToRead}>Toque para marcar como lida</Text>
              )}
            </View>

            {/* Bolinha de não lido */}
            {!item.read && <View style={styles.unreadDot} />}
          </Pressable>
        ))}
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
    paddingTop: 60,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as ViewStyle,
  backButton: { padding: 4 } as ViewStyle,
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  content: { flex: 1 } as ViewStyle,
  
  // Card Styles
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    gap: 12,
  } as ViewStyle,
  cardUnread: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    elevation: 2, // Sombra leve no Android
    shadowColor: '#000', // Sombra leve no iOS
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  } as ViewStyle,
  cardRead: {
    backgroundColor: theme.colors.muted, // Mais escuro para indicar lido
    borderColor: 'transparent',
    opacity: 0.8,
  } as ViewStyle,
  cardEmergency: {
    borderColor: '#FCA5A5', // Borda vermelha clara
    backgroundColor: '#FEF2F2', // Fundo vermelho muito claro
  } as ViewStyle,

  // Icons
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  iconEmergency: {
    backgroundColor: '#FEE2E2', // Vermelho claro
  } as ViewStyle,
  iconInfo: {
    backgroundColor: '#EDE9FE', // Roxo claro
  } as ViewStyle,

  // Text Content
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  } as ViewStyle,
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  } as TextStyle,
  timeText: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  } as TextStyle,
  cardMessage: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    lineHeight: 20,
  } as TextStyle,
  clickToRead: {
    fontSize: 10,
    color: theme.colors.accent,
    marginTop: 8,
  } as TextStyle,
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
    marginTop: 6,
  } as ViewStyle,
});