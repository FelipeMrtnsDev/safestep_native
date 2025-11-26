import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { House, User } from 'lucide-react-native'; 
import { theme } from '../../theme/colors';

export default function CaregiverLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          height: Platform.OS === 'ios' ? 90 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      
      {/* Rotas Ocultas */}
      <Tabs.Screen name="map" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="occurrence" options={{ href: null, tabBarStyle: { display: 'none' } }} />
      
      {/* NOVA ROTA DE NOTIFICAÇÕES */}
      <Tabs.Screen name="notifications" options={{ href: null, tabBarStyle: { display: 'none' } }} />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}