import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  PanResponder, 
  Vibration,
  PanResponderGestureState,
  ViewStyle,
  TextStyle,
  Pressable
} from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { XCircle, AlertTriangle } from 'lucide-react-native';

interface BlindLocationScreenProps {
  isActive: boolean;
  onToggleLocation: (active: boolean) => void;
}

export default function BlindLocationScreen({ isActive, onToggleLocation }: BlindLocationScreenProps) {
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  
  // --- CORREÇÃO DO ESTADO OBSOLETO ---
  // Criamos uma referência para sempre ter o valor atual de isActive dentro do PanResponder
  const isActiveRef = useRef(isActive);

  // Atualizamos a referência toda vez que a prop muda
  useEffect(() => {
    isActiveRef.current = isActive;
    console.log("Estado atualizado para:", isActive ? "ATIVO" : "INATIVO");
  }, [isActive]);
  // -----------------------------------

  // Animações
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  // Refs para lógica de gestos
  const tapCountRef = useRef<number>(0);
  const lastTapTimeRef = useRef<number>(0);
  const emergencyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playAudio = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'pt-BR', rate: 1.0 });
  };

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.5, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive]);

  const handleTap = () => {
    const now = Date.now();
    const timeDiff = now - lastTapTimeRef.current;

    if (timeDiff < 600) { 
      tapCountRef.current++;
    } else {
      tapCountRef.current = 1;
    }
    lastTapTimeRef.current = now;

    console.log("Toques detectados:", tapCountRef.current);

    if (tapCountRef.current === 3) {
      if (emergencyActive) {
        cancelEmergency();
      } else {
        triggerEmergency();
      }
      tapCountRef.current = 0;
    }
  };

  const triggerEmergency = () => {
    console.log("ACIONANDO EMERGÊNCIA");
    setEmergencyActive(true);
    playAudio("ALERTA DE EMERGÊNCIA! Toque 3 vezes para cancelar.");
    Vibration.vibrate([200, 100, 200, 100, 200]); 

    if (emergencyTimeoutRef.current) clearTimeout(emergencyTimeoutRef.current);

    emergencyTimeoutRef.current = setTimeout(() => {
      setEmergencyActive((currentStatus) => {
        if (currentStatus === true) {
          playAudio("Modo de emergência desativado automaticamente.");
          return false;
        }
        return currentStatus;
      });
    }, 30000);
  };

  const cancelEmergency = () => {
    console.log("CANCELANDO EMERGÊNCIA");
    setEmergencyActive(false);
    if (emergencyTimeoutRef.current) {
      clearTimeout(emergencyTimeoutRef.current);
      emergencyTimeoutRef.current = null;
    }
    playAudio("Modo de emergência cancelado.");
    Vibration.vibrate([100, 50, 100]);
  };

  useEffect(() => {
    return () => {
      if (emergencyTimeoutRef.current) clearTimeout(emergencyTimeoutRef.current);
    };
  }, []);

  // --- GESTOS (ARRASTAR) ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        handleTap();
      },
      
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        // Log para ver se está detectando o movimento
        // console.log("Arrastando DY:", gestureState.dy); 
        dragY.setValue(gestureState.dy);
      },
      
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dy } = gestureState;
        const currentIsActive = isActiveRef.current; // USA O REF, NÃO A PROP DIRETA

        console.log(`SOLTOU O DEDO. DY: ${dy.toFixed(2)} | Estado Atual: ${currentIsActive}`);

        Animated.spring(dragY, { toValue: 0, useNativeDriver: true }).start();

        // dy > 50 = Arrastou para BAIXO (Valor Positivo)
        // dy < -50 = Arrastou para CIMA (Valor Negativo)

        if (currentIsActive && dy > 50) {
           console.log("Gestor: DESATIVANDO");
           Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
           onToggleLocation(false);
        } 
        else if (!currentIsActive && dy < -50) {
           console.log("Gesto: ATIVANDO");
           Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
           onToggleLocation(true);
        } else {
           console.log("Gesto insuficiente ou direção errada para o estado atual.");
        }
      }
    })
  ).current;

  // Feedback de áudio inicial
  useEffect(() => {
    if (isActive) {
      playAudio("Localização ativa. Arraste para BAIXO para desativar.");
    } else {
      playAudio("Localização desativada. Arraste para CIMA para ativar.");
    }
  }, [isActive]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      
      {emergencyActive && (
        <Pressable 
          style={styles.emergencyOverlay} 
          onPress={handleTap} 
        >
          <View style={styles.emergencyContent}>
            <AlertTriangle size={80} color="#FFFFFF" style={{ marginBottom: 20 }} />
            <Text style={styles.emergencyTitle}>EMERGÊNCIA!</Text>
            <Text style={styles.emergencyText}>Cuidador notificado</Text>
            <Text style={styles.emergencySubText}>Toque 3 vezes para cancelar</Text>
            <Text style={styles.emergencyTimer}>Desliga em 30s</Text>
          </View>
        </Pressable>
      )}

      <Animated.View 
        style={[
          styles.contentContainer,
          { transform: [{ translateY: dragY }] }
        ]}
      >
        {isActive ? (
          <>
            <View style={styles.pulseContainer}>
              <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: 0.3 }]} />
              <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: 0.5, width: 160, height: 160 }]} />
              <View style={styles.activeDot} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Localização Ativa</Text>
              <Text style={styles.subtitle}>Arraste para BAIXO para desativar</Text>
              <Text style={styles.hint}>Toque 3 vezes rápido para emergência</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.inactiveIcon}>
              <XCircle size={40} color="#6B7280" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Localização Desativada</Text>
              <Text style={styles.subtitle}>Arraste para CIMA para ativar</Text>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: '100%', 
  } as ViewStyle,
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
    width: '100%',
  } as ViewStyle,
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
  } as ViewStyle,
  pulseCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  } as ViewStyle,
  activeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    zIndex: 10,
  } as ViewStyle,
  inactiveIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  } as ViewStyle,
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  } as TextStyle,
  hint: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 10,
  } as TextStyle,
  emergencyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EF4444',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  emergencyContent: {
    alignItems: 'center',
    padding: 20,
  } as ViewStyle,
  emergencyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  } as TextStyle,
  emergencyText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold'
  } as TextStyle,
  emergencySubText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  } as TextStyle,
  emergencyTimer: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  } as TextStyle,
});