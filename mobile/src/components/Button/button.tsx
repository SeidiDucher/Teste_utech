import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, disabled, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, (disabled || isLoading) && styles.buttonDisabled, style]} 
      disabled={disabled || isLoading} 
      {...rest}
    >
      {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}