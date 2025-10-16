import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text, Image } from 'react-native';
import { useTheme } from '../constants/Colors'; 

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const bgPulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Background pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(bgPulseAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Start animations sequence
    Animated.parallel([
      // Logo fade and scale
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      // Gentle rotation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      // Text slide up
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      // Progress bar
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    // Check if user is logged in and navigate accordingly
    const checkAuthStatus = async () => {
      setTimeout(() => {
        navigation.replace('Login');
      }, 2800);
    };

    checkAuthStatus();
  }, [navigation, fadeAnim, scaleAnim, rotateAnim, slideUpAnim, progressAnim, bgPulseAnim]);

  // Interpolate rotation for subtle effect
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '5deg'],
  });

  // Progress bar width interpolation
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Background color interpolation for pulse effect
  const bgColor = bgPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primary, '#d1c7bbff'] // Pulse between primary and slightly lighter color
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternCircle, styles.patternCircle1]} />
        <View style={[styles.patternCircle, styles.patternCircle2]} />
        <View style={[styles.patternCircle, styles.patternCircle3]} />
      </View>

      {/* Animated Logo Container with Shadow */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
             
            ]
          }
        ]}
      >
        <Image 
          source={require('../assets/images/LogoT.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Glow effect */}
        <View style={[styles.glowEffect, { backgroundColor: colors.background }]} />
      </Animated.View>

      {/* App Name with Animation */}
      <Animated.Text 
        style={[
          styles.appName,
          { color: colors.background },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
        TradeConnect
      </Animated.Text>

      {/* Tagline with Animation */}
      <Animated.Text 
        style={[
          styles.tagline,
          { color: colors.background },
          {
            opacity: slideUpAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0]
            }),
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
        Global B2B Marketplace
      </Animated.Text>

      {/* Features List */}
      <Animated.View 
        style={[
          styles.featuresContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
        <View style={styles.featureItem}>
          <Text style={[styles.featureIcon, { color: colors.background }]}>✓</Text>
          <Text style={[styles.featureText, { color: colors.background }]}>
            Wholesale Prices
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureIcon, { color: colors.background }]}>✓</Text>
          <Text style={[styles.featureText, { color: colors.background }]}>
            Global Suppliers
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureIcon, { color: colors.background }]}>✓</Text>
          <Text style={[styles.featureText, { color: colors.background }]}>
            Secure Transactions
          </Text>
        </View>
      </Animated.View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
          <Animated.View 
            style={[
              styles.progressFill,
              { 
                backgroundColor: colors.background,
                width: progressWidth
              }
            ]} 
          />
        </View>
      </View>

      {/* Loading Text */}
      <Animated.Text 
        style={[
          styles.loadingText,
          { color: colors.background },
          {
            opacity: progressAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 1]
            })
          }
        ]}
      >
        Connecting you to global markets...
      </Animated.Text>

      {/* Floating Particles/Orbs */}
      <Animated.View style={[styles.orb, styles.orb1, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.orb, styles.orb2, { 
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0]
          })
        }]
      }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  patternCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.05,
    backgroundColor: 'white',
  },
  patternCircle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  patternCircle2: {
    width: 200,
    height: 200,
    bottom: -50,
    left: -50,
  },
  patternCircle3: {
    width: 150,
    height: 150,
    top: '40%',
    left: '60%',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 180,
    height: 180,
    zIndex: 2,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.2,
    top: -10,
    left: -10,
    zIndex: 1,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  featuresContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  featureIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  progressContainer: {
    width: '60%',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  orb: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
    backgroundColor: 'white',
  },
  orb1: {
    width: 100,
    height: 100,
    top: '20%',
    right: '10%',
  },
  orb2: {
    width: 60,
    height: 60,
    bottom: '25%',
    left: '15%',
  },
  orb3: {
    width: 80,
    height: 80,
    top: '60%',
    right: '20%',
  },
});

export default SplashScreen;