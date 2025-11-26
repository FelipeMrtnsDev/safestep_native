import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useAuth } from '../../context/AuthContext';
import { Bell, MapPin, FileText } from 'lucide-react-native';
import { theme } from '../../theme/colors';

const PATIENTS = [
  { id: '1', name: 'João Silva', condition: 'Deficiência Visual Total', coords: { lat: -3.119027, lng: -60.021731 } },
  { id: '2', name: 'Maria Santos', condition: 'Baixa Visão', coords: { lat: -3.132000, lng: -60.030000 } },
];

export default function CaregiverHome() {
  const { userName } = useAuth();
  const router = useRouter();

  // Simulação de notificações não lidas
  const hasUnreadNotifications = true;

  const handleLocatePatient = (patientId: string) => {
    router.push({ pathname: "/(caregiver)/map", params: { patientId } });
  };

  const handleGeneralMap = () => {
    router.push("/(caregiver)/map");
  };

  const handleOccurrence = () => {
    router.push("/(caregiver)/occurrence");
  };

  // Função para ir para notificações
  const handleNotifications = () => {
    router.push("/(caregiver)/notifications");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeLabel}>Bem-vindo de volta,</Text>
          <Text style={styles.userName}>{userName || 'Cuidador'}</Text>
        </View>
        
        {/* Botão de Notificação Atualizado */}
        <Pressable style={styles.notificationButton} onPress={handleNotifications}>
          <Bell size={20} color={theme.colors.mutedForeground} />
          {hasUnreadNotifications && <View style={styles.badge} />}
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        
        {/* Ações Rápidas */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard} onPress={handleOccurrence}>
            <View style={styles.iconCircle}>
               <FileText size={24} color={theme.colors.accent} />
            </View>
            <Text style={styles.actionText}>Registrar{'\n'}Ocorrência</Text>
          </Pressable>

          <Pressable style={styles.actionCard} onPress={handleGeneralMap}>
            <View style={styles.iconCircle}>
               <MapPin size={24} color={theme.colors.accent} />
            </View>
            <Text style={styles.actionText}>Mapa{'\n'}Geral</Text>
          </Pressable>
        </View>

        {/* Lista de Pacientes */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Meus Pacientes</Text>
        <View style={styles.patientList}>
          {PATIENTS.map((patient) => (
            <View key={patient.id} style={styles.patientCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientCondition}>{patient.condition}</Text>
              </View>
              
              <Pressable 
                style={styles.locateButton} 
                onPress={() => handleLocatePatient(patient.id)}
              >
                <MapPin size={20} color="#FFFFFF" />
                <Text style={styles.locateButtonText}>Localizar</Text>
              </Pressable>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  header: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card } as ViewStyle,
  welcomeLabel: { color: theme.colors.mutedForeground, fontSize: 14 } as TextStyle,
  userName: { fontSize: 20, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  
  // Notification Styles
  notificationButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.muted, alignItems: 'center', justifyContent: 'center', position: 'relative' } as ViewStyle,
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444', // Vermelho
    borderWidth: 2,
    borderColor: theme.colors.card,
  } as ViewStyle,

  content: { flex: 1 } as ViewStyle,
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.foreground } as TextStyle,
  
  // Actions
  actionsGrid: { flexDirection: 'row', gap: 16 } as ViewStyle,
  actionCard: { flex: 1, backgroundColor: theme.colors.muted, padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', height: 120 } as ViewStyle,
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8 } as ViewStyle,
  actionText: { color: theme.colors.accent, fontWeight: 'bold', textAlign: 'center', fontSize: 14 } as TextStyle,

  // Patient List
  patientList: { gap: 12 } as ViewStyle,
  patientCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border } as ViewStyle,
  patientName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  patientCondition: { fontSize: 12, color: theme.colors.mutedForeground, marginTop: 2 } as TextStyle,
  locateButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.accent, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, gap: 6 } as ViewStyle,
  locateButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' } as TextStyle,
});