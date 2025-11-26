import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface ActionButtonProps {
  onPress: () => void;
  title: string;
  icon: LucideIcon;
  variant?: 'primary' | 'destructive';
}

export default function ActionButton({ onPress, title, icon: Icon, variant = 'primary' }: ActionButtonProps) {
  const bgClass = variant === 'destructive' ? 'bg-red-100' : 'bg-blue-100';
  const textClass = variant === 'destructive' ? 'text-red-600' : 'text-blue-600';
  const iconColor = variant === 'destructive' ? '#dc2626' : '#2563eb';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`w-full ${bgClass} py-4 rounded-xl flex-row items-center justify-center gap-2 mb-3 active:opacity-70`}
    >
      <Icon size={20} color={iconColor} />
      <Text className={`font-semibold text-base ${textClass}`}>{title}</Text>
    </TouchableOpacity>
  );
}