// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.secondary };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          borderWidth: 1, 
          borderColor: colors.primary 
        };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: colors.primary };
      default:
        return { color: '#FFFFFF' };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextStyle().color} />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;