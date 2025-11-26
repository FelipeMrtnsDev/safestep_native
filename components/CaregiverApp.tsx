import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/colors';
import MapView from './MapView';
import BlindView from './BlindView';
import ProfilePage from './ProfilePage';
import BottomNav from './BottomNav';

interface CaregiverAppProps {
  onLogout: () => void;
}

type PageType = 'map' | 'blind' | 'profile';

export default function CaregiverApp({ onLogout }: CaregiverAppProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('map');

  return (
    <View style={styles.container}>
      {/* Main Content (flex: 1 faz ocupar o espaço todo menos a navbar) */}
      <View style={styles.mainContent}>
        {currentPage === 'map' && <MapView />}
        {currentPage === 'blind' && <BlindView />}
        {currentPage === 'profile' && <ProfilePage onLogout={onLogout} />}
      </View>

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background } as ViewStyle,
  mainContent: { flex: 1 } as ViewStyle,
});