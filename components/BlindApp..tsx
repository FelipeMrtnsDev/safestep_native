import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import * as Speech from 'expo-speech';
import BlindLocationScreen from './BlindLocationScreen';

interface BlindAppProps {
  onLogout: () => void;
}

export default function BlindApp({ onLogout }: BlindAppProps) {
  const [isLocationActive, setIsLocationActive] = useState<boolean>(true);

  const playAudio = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'pt-BR' });
  };

  const handleToggleLocation = (active: boolean) => {
    setIsLocationActive(active);
    if (!active) {
      playAudio("Localização desativada");
    } else {
      playAudio("Localização ativada");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <BlindLocationScreen 
          isActive={isLocationActive} 
          onToggleLocation={handleToggleLocation} 
        />
      </View>

      <View style={styles.bottomBar}>
        {!isLocationActive && (
          <Pressable 
            style={[styles.button, styles.btnPrimary]}
            onPress={() => handleToggleLocation(true)}
          >
            <Text style={styles.btnTextPrimary}>Ativar Localização</Text>
          </Pressable>
        )}
        
        <Pressable 
          style={[styles.button, styles.btnOutline]}
          onPress={onLogout}
        >
          <Text style={styles.btnTextOutline}>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  } as ViewStyle,
  bottomBar: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  btnPrimary: {
    backgroundColor: '#8B5CF6',
  } as ViewStyle,
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EF4444',
  } as ViewStyle,
  btnTextPrimary: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  } as TextStyle,
  btnTextOutline: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 16,
  } as TextStyle
});