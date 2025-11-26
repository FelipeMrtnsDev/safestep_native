import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { MapPin, Users, User } from 'lucide-react-native';
import { theme } from '../theme/colors';

type PageType = 'map' | 'blind' | 'profile';

interface BottomNavProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export default function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navContent}>
        {/* Botão Mapa */}
        <Pressable 
          style={styles.navItem} 
          onPress={() => onPageChange('map')}
        >
          <MapPin 
            size={24} 
            color={currentPage === 'map' ? theme.colors.accent : theme.colors.mutedForeground} 
          />
          <Text style={[
            styles.navText, 
            currentPage === 'map' ? styles.activeText : styles.inactiveText
          ]}>
            Localizar
          </Text>
        </Pressable>

        {/* Botão Deficientes */}
        <Pressable 
          style={styles.navItem} 
          onPress={() => onPageChange('blind')}
        >
          <Users 
            size={24} 
            color={currentPage === 'blind' ? theme.colors.accent : theme.colors.mutedForeground} 
          />
          <Text style={[
            styles.navText, 
            currentPage === 'blind' ? styles.activeText : styles.inactiveText
          ]}>
            Deficientes
          </Text>
        </Pressable>

        {/* Botão Perfil */}
        <Pressable 
          style={styles.navItem} 
          onPress={() => onPageChange('profile')}
        >
          <User 
            size={24} 
            color={currentPage === 'profile' ? theme.colors.accent : theme.colors.mutedForeground} 
          />
          <Text style={[
            styles.navText, 
            currentPage === 'profile' ? styles.activeText : styles.inactiveText
          ]}>
            Perfil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 20, // Espaço para Home Indicator no iOS
    // Sombras (Shadow-lg do tailwind)
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
    }),
  } as ViewStyle,
  navContent: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  } as ViewStyle,
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  } as ViewStyle,
  navText: {
    fontSize: 12,
    fontWeight: '500',
  } as TextStyle,
  activeText: {
    color: theme.colors.accent,
  } as TextStyle,
  inactiveText: {
    color: theme.colors.mutedForeground,
  } as TextStyle,
});