import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { LogOut, Edit2 } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import InfoCard from '../../components/ui/InfoCard';
import ActionButton from '../../components/ui/ActionButton';

export default function ProfileScreen() {
  const { userName, userEmail, logout } = useAuth();
  
  // Lógica da primeira letra
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 flex-col">
        
        {/* Header */}
        <View className="bg-white border-b border-gray-100 p-4 pt-2">
          <Text className="text-2xl font-bold text-gray-900">Meu Perfil</Text>
        </View>

        {/* Content Scrollable */}
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View className="flex-col items-center mb-8 mt-4">
            <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-4 border-2 border-blue-50">
              <Text className="text-blue-600 text-4xl font-bold">
                {firstLetter}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">{userName}</Text>
            <Text className="text-sm text-gray-500">Cuidador Profissional</Text>
          </View>

          {/* Info Cards Section */}
          <View className="space-y-4 mb-8">
            <InfoCard 
              label="Email" 
              value={userEmail} 
            />
            <InfoCard 
              label="Telefone" 
              value="(11) 99999-0000" 
            />
            <InfoCard 
              label="Deficientes sob Cuidado" 
              value="3 pessoas" 
            />
            <InfoCard 
              label="Status" 
              value="Online e disponível" 
              valueColor="text-green-600"
            />
          </View>
        </ScrollView>

        {/* Actions Footer (Fixed at bottom) */}
        <View className="p-4 border-t border-gray-100 bg-white shadow-sm">
            {/* Botão de Editar (apenas visual por enquanto) */}
          <ActionButton 
            title="Editar Perfil" 
            icon={Edit2} 
            onPress={() => console.log('Editar')} 
            variant="primary"
          />
          
          {/* Botão de Logout */}
          <ActionButton 
            title="Sair da Conta" 
            icon={LogOut} 
            onPress={logout} 
            variant="destructive"
          />
        </View>

      </View>
    </SafeAreaView>
  );
}