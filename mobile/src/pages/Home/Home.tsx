import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuizStore } from '../../store/useQuizStore';

export function Home() {
  const navigation = useNavigation();
  const { playerName, setPlayerName, fetchQuiz, isLoading, error } = useQuizStore();

  async function handleStartGame() {
    if (!playerName.trim()) return;
    
    await fetchQuiz();
    
    // Se não deu erro no fetch, avança para a tela do jogo
    if (!useQuizStore.getState().error) {
      navigation.navigate('Trivia');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🧠 Tryvia<Text style={styles.logoDetail}>Tech</Text></Text>
      <Text style={styles.subtitle}>Teste seus conhecimentos com nosso quiz inteligente!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite seu nome para jogar:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Desenvolvedor Júnior"
          placeholderTextColor="#7c7c8a"
          value={playerName}
          onChangeText={setPlayerName}
          editable={!isLoading}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, !playerName.trim() && styles.buttonDisabled]}
        onPress={handleStartGame}
        disabled={!playerName.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Desafio</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        padding: 24, 
        backgroundColor: '#121214' 
    },
    logo: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#FFF', 
        textAlign: 'center', 
        marginBottom: 8 
    },
    logoDetail: { 
        color: '#00b37e' 
    },
    subtitle: { 
        fontSize: 16, 
        color: '#c4c4cc', 
        textAlign: 'center', 
        marginBottom: 40 },
        inputContainer: { 
        width: '100%', 
        marginBottom: 16 
    },
    label: { 
        color: '#e1e1e6', 
        fontSize: 14, 
        marginBottom: 8, 
        fontWeight: '600' 
    },
    input: { 
        backgroundColor: '#202024', 
        color: '#FFF', 
        padding: 16, 
        borderRadius: 8, 
        fontSize: 16, 
        borderWidth: 1, 
        borderColor: '#323238' 
    },
    button: { 
        backgroundColor: '#00b37e', 
        padding: 16, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginTop: 8, height: 56, 
        justifyContent: 'center' 
    },
    buttonDisabled: { 
        opacity: 0.5 
    },
    buttonText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    errorText: { 
        color: '#f75a68', 
        textAlign: 'center', 
        marginBottom: 12,
        fontWeight: '500' 
    }
});
