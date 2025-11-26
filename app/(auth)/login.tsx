import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Eye, HeartHandshake } from 'lucide-react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (type: 'caregiver' | 'blind') => {
    // Validação simples
    const finalName = name || (type === 'caregiver' ? 'Cuidador Exemplo' : 'Usuário Visual');
    const finalEmail = email || 'usuario@email.com';
    
    login(type, finalName, finalEmail);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center p-6"
      >
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4">
             <HeartHandshake color="white" size={40} />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Cuidador Seguro</Text>
          <Text className="text-gray-500 text-center mt-2">
            Conectando quem precisa de ajuda a quem ama cuidar.
          </Text>
        </View>

        <View className="space-y-4 mb-8">
          <View>
            <Text className="text-gray-700 font-medium mb-1">Seu Nome</Text>
            <TextInput 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View>
            <Text className="text-gray-700 font-medium mb-1">Email</Text>
            <TextInput 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <Text className="text-center text-gray-500 mb-4 font-semibold">
          Entrar como:
        </Text>

        <View className="gap-4">
          <TouchableOpacity 
            onPress={() => handleLogin('caregiver')}
            className="w-full bg-blue-600 p-4 rounded-xl flex-row items-center justify-center gap-3 shadow-sm"
          >
            <HeartHandshake color="white" size={24} />
            <Text className="text-white font-bold text-lg">Sou Cuidador</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleLogin('blind')}
            className="w-full bg-gray-900 p-4 rounded-xl flex-row items-center justify-center gap-3 shadow-sm"
          >
            <Eye color="white" size={24} />
            <Text className="text-white font-bold text-lg">Sou Deficiente Visual</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}