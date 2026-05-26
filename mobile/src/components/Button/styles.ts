// Estilos do Botão Reutilizável
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00b37e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    width: '100%'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});