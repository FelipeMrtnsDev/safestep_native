import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import InfoCard from '../../components/ui/InfoCard';
import { Bell } from 'lucide-react-native';

export default function CaregiverHome() {
  const { userName } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Simples */}
      <View className="p-6 flex-row justify-between items-center border-b border-gray-100">
        <View>
          <Text className="text-gray-500 text-sm">Bem-vindo de volta,</Text>
          <Text className="text-xl font-bold text-gray-900">{userName}</Text>
        </View>
        <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
          <Bell size={20} color="#64748b" />
        </View>
      </View>

      <ScrollView className="p-6">
        <Text className="text-lg font-bold mb-4 text-gray-800">Resumo do Dia</Text>
        
        {/* Usando o componente InfoCard reutilizável */}
        <InfoCard label="Próxima Visita" value="14:00 - Sr. João" />
        <InfoCard label="Alertas Pendentes" value="Nenhum alerta" valueColor="text-green-600" />
        
        <Text className="text-lg font-bold mb-4 mt-6 text-gray-800">Ações Rápidas</Text>
        <View className="flex-row gap-4">
          <View className="flex-1 bg-blue-50 p-4 rounded-xl items-center justify-center h-24">
            <Text className="text-blue-700 font-bold text-center">Registrar{'\n'}Ocorrência</Text>
          </View>
          <View className="flex-1 bg-blue-50 p-4 rounded-xl items-center justify-center h-24">
             <Text className="text-blue-700 font-bold text-center">Localizar{'\n'}Paciente</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}