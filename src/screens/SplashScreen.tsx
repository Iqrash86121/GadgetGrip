// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../constants/Colors'; 

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    // Check if user is logged in and navigate accordingly
    const checkAuthStatus = async () => {
      // Simulate loading process
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Image 
        source={require('../assets/images/LogoT.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: colors.background }]}>
        Alibaba Clone
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;