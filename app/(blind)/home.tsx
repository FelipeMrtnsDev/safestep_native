import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import * as Speech from 'expo-speech';
import { useAuth } from '../../context/AuthContext';
import BlindLocationScreen from '../../components/BlindLocationScreen'; 

export default function BlindHome() {
  const { logout } = useAuth();
  const [isLocationActive, setIsLocationActive] = useState<boolean>(true);

  const playAudio = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'pt-BR' });
  };

  const handleToggleLocation = (active: boolean) => {
    setIsLocationActive(active);
    // O feedback de áudio já está sendo tratado dentro do BlindLocationScreen
    // mas se quiser forçar aqui também, pode descomentar:
    /*
    if (!active) {
      playAudio("Localização desativada");
    } else {
      playAudio("Localização ativada");
    }
    */
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
        {/* Este botão agora deve funcionar perfeitamente com a correção no componente filho */}
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
          onPress={logout}
        >
          <Text style={styles.btnTextOutline}>Sair do App</Text>
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  btnPrimary: {
    backgroundColor: '#8B5CF6',
  } as ViewStyle,
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#EF4444',
  } as ViewStyle,
  btnTextPrimary: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  } as TextStyle,
  btnTextOutline: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 18,
  } as TextStyle
});