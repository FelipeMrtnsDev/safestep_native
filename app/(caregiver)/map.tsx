import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions, ViewStyle, TextStyle } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme/colors';

// Mesmos dados do mock da home
const PATIENTS = [
  { id: '1', name: 'João Silva', coords: { latitude: -3.119027, longitude: -60.021731 } },
  { id: '2', name: 'Maria Santos', coords: { latitude: -3.132000, longitude: -60.030000 } },
];

// Manaus Default
const INITIAL_REGION = {
  latitude: -3.119027,
  longitude: -60.021731,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();
  const [region, setRegion] = useState(INITIAL_REGION);

  useEffect(() => {
    if (patientId) {
      const patient = PATIENTS.find(p => p.id === patientId);
      if (patient) {
        setRegion({
          ...patient.coords,
          latitudeDelta: 0.01, // Zoom mais próximo
          longitudeDelta: 0.01,
        });
      }
    }
  }, [patientId]);

  return (
    <View style={styles.container}>
      {/* Botão Voltar Flutuante */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={theme.colors.foreground} />
      </Pressable>

      <MapView 
        style={styles.map} 
        region={region}
        provider={PROVIDER_DEFAULT} // Usa Google Maps no Android se configurado, ou Apple Maps no iOS
      >
        {PATIENTS.map(patient => (
          <Marker
            key={patient.id}
            coordinate={patient.coords}
            title={patient.name}
            description="Localização em tempo real"
            pinColor={patient.id === patientId ? theme.colors.accent : 'red'} // Destaca o selecionado
          />
        ))}
      </MapView>

      {/* Card Informativo Inferior */}
      <View style={styles.bottomCard}>
        <Text style={styles.cardTitle}>
          {patientId 
            ? `Localizando: ${PATIENTS.find(p => p.id === patientId)?.name}` 
            : "Visão Geral dos Pacientes"}
        </Text>
        <Text style={styles.cardSubtitle}>
          Atualizado há 2 minutos
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' } as ViewStyle,
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height } as ViewStyle,
  backButton: {
    position: 'absolute',
    top: 60, // Safe area
    left: 20,
    zIndex: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  } as ViewStyle,
  bottomCard: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  } as ViewStyle,
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  cardSubtitle: { fontSize: 12, color: theme.colors.mutedForeground, marginTop: 4 } as TextStyle,
});