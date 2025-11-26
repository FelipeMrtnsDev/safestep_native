import React from 'react';
import { View, Text } from 'react-native';

interface InfoCardProps {
  label: string;
  value: string;
  valueColor?: string; // Para permitir cores customizadas (ex: verde)
}

export default function InfoCard({ label, value, valueColor }: InfoCardProps) {
  return (
    <View className="bg-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
      <Text className="text-xs text-gray-500 uppercase font-bold mb-1">
        {label}
      </Text>
      <Text 
        className={`text-base font-medium ${valueColor ? valueColor : 'text-gray-900'}`}
      >
        {value}
      </Text>
    </View>
  );
}