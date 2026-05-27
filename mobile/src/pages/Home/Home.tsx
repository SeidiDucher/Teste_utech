import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuizStore } from '../../store/useQuizStore';
import { styles } from './styles';

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

