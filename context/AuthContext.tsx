import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { router } from 'expo-router';

type UserType = 'caregiver' | 'blind' | null;

interface AuthContextType {
  userType: UserType;
  userName: string;
  userEmail: string;
  login: (type: UserType, name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    const type = await storage.getItem('userType');
    const name = await storage.getItem('userName');
    const email = await storage.getItem('userEmail');
    
    if (type) setUserType(type as UserType);
    if (name) setUserName(name);
    if (email) setUserEmail(email);
    setIsLoading(false);
  }

  const login = (type: UserType, name: string, email: string) => {
    setUserType(type);
    setUserName(name);
    setUserEmail(email);
    storage.setItem('userType', type!);
    storage.setItem('userName', name);
    storage.setItem('userEmail', email);
    
    // Roteamento automático após login
    if (type === 'caregiver') router.replace('/(caregiver)/home');
    else if (type === 'blind') router.replace('/(blind)/home');
  };

  const logout = () => {
    setUserType(null);
    setUserName('');
    setUserEmail('');
    storage.removeItem('userType');
    storage.removeItem('userName');
    storage.removeItem('userEmail');
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ userType, userName, userEmail, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);