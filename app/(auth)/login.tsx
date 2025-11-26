import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Eye, HeartHandshake } from 'lucide-react-native';
import { theme } from '../../theme/colors';

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            {/* AQUI ESTÁ A MUDANÇA:
               Troque 'icon.png' pelo nome exato do seu arquivo dentro da pasta assets 
            */}
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.logoImage}
              resizeMode="cover" // ou "contain" se quiser que a imagem inteira apareça sem cortar
            />
          </View>
          
          <Text style={styles.appTitle}>Safestep</Text>
          <Text style={styles.appSubtitle}>
            Conectando quem precisa de ajuda a quem ama cuidar.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          Entrar como:
        </Text>

        <View style={styles.buttonGroup}>
          {/* Botão Cuidador */}
          <Pressable 
            onPress={() => handleLogin('caregiver')}
            style={({ pressed }) => [
              styles.roleButton,
              styles.caregiverButton,
              { opacity: pressed ? 0.9 : 1 }
            ]}
          >
            <HeartHandshake color="white" size={24} />
            <Text style={styles.buttonText}>Sou Cuidador</Text>
          </Pressable>

          {/* Botão Deficiente Visual */}
          <Pressable 
            onPress={() => handleLogin('blind')}
            style={({ pressed }) => [
              styles.roleButton,
              styles.blindButton,
              { opacity: pressed ? 0.9 : 1 }
            ]}
          >
            <Eye color="white" size={24} />
            <Text style={styles.buttonText}>Sou Deficiente Visual</Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  } as ViewStyle,
  
  // Logo Styles
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  } as ViewStyle,
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden', // Garante que a imagem respeite as bordas arredondadas
    backgroundColor: 'transparent', // Caso a imagem tenha fundo transparente
    // Sombra suave
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  } as ViewStyle,
  logoImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  } as TextStyle,
  appSubtitle: {
    textAlign: 'center',
    color: theme.colors.mutedForeground,
    marginTop: 8,
    fontSize: 16,
  } as TextStyle,

  // Buttons Section
  sectionLabel: {
    textAlign: 'center',
    color: theme.colors.mutedForeground,
    marginBottom: 16,
    fontWeight: '600',
  } as TextStyle,
  buttonGroup: {
    gap: 16,
  } as ViewStyle,
  roleButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  
  // Specific Button Colors
  caregiverButton: {
    backgroundColor: theme.colors.accent, // Roxo/Azul do tema
  } as ViewStyle,
  blindButton: {
    backgroundColor: theme.colors.primary, // Cinza escuro/Preto do tema
  } as ViewStyle,
  
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  } as TextStyle,
});