import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function App() {
  const { userType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!userType) {
        router.replace('/(auth)/login');
      } else if (userType === 'caregiver') {
        router.replace('/(caregiver)/profile'); 
      } else if (userType === 'blind') {
        router.replace('/(blind)/home');
      }
    }
  }, [userType, isLoading]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}