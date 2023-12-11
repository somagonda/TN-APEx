import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{token, checkLoginStatus}}>
      {children}
    </AuthContext.Provider>
  );
};
