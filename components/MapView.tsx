import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { theme } from '../theme/colors';

export default function MapView() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Localizar Deficientes</Text>
        <Text style={styles.headerSubtitle}>Visualize a localização em tempo real</Text>
      </View>

      {/* Map Container - Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholderContent}>
          <MapPin size={48} color={theme.colors.accent} style={{ opacity: 0.4, marginBottom: 16 }} />
          <Text style={styles.mapText}>Mapa será integrado aqui</Text>
          <Text style={styles.mapSubtext}>Google Maps integração em progresso</Text>
        </View>
      </View>

      {/* Info Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.infoList}>
          {/* Item 1 */}
          <View style={styles.infoItem}>
            <View style={styles.markerCircle}>
              <Text style={styles.markerText}>1</Text>
            </View>
            <View>
              <Text style={styles.personName}>João Silva</Text>
              <Text style={styles.distanceText}>Distância: 2.5 km</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.infoItem}>
            <View style={styles.markerCircle}>
              <Text style={styles.markerText}>2</Text>
            </View>
            <View>
              <Text style={styles.personName}>Maria Santos</Text>
              <Text style={styles.distanceText}>Distância: 5.8 km</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card } as ViewStyle,
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.foreground } as TextStyle,
  headerSubtitle: { fontSize: 14, color: theme.colors.mutedForeground, marginTop: 4 } as TextStyle,
  
  // Map Area
  mapContainer: { flex: 1, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' } as ViewStyle,
  mapPlaceholderContent: { alignItems: 'center' } as ViewStyle,
  mapText: { fontSize: 16, fontWeight: '500', color: theme.colors.foreground } as TextStyle,
  mapSubtext: { fontSize: 14, color: theme.colors.mutedForeground, marginTop: 8 } as TextStyle,

  // Info Panel
  infoPanel: { backgroundColor: theme.colors.card, borderTopWidth: 1, borderTopColor: theme.colors.border, padding: 16 } as ViewStyle,
  infoList: { gap: 12 } as ViewStyle,
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 12 } as ViewStyle,
  markerCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDE9FE', alignItems: 'center', justifyContent: 'center' } as ViewStyle,
  markerText: { color: theme.colors.accent, fontWeight: 'bold', fontSize: 14 } as TextStyle,
  personName: { fontSize: 14, fontWeight: '500', color: theme.colors.foreground } as TextStyle,
  distanceText: { fontSize: 12, color: theme.colors.mutedForeground } as TextStyle,
});