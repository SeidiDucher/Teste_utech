import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuizStore } from '../../store/useQuizStore';
import { Button } from '../../components/Button/button'; // Importando seu componente global
import { styles } from './styles';
import axios from 'axios';

interface RankingItem {
  id: number;
  name: string;
  score: number;
}

export function Resultado() {
  const navigation = useNavigation();
  const { finalScore, resetGame, playerName } = useQuizStore();
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loadingRanking, setLoadingRanking] = useState(true);

  async function fetchRanking() {
    try {
      setLoadingRanking(true);
      const response = await axios.get('http://localhost:3333/ranking');
      setRanking(response.data);
    } catch (error) {
      console.error('Erro ao buscar ranking', error);
    } finally {
      setLoadingRanking(false);
    }
  }

  async function handleResetRanking() {
    try {
      await axios.delete('http://localhost:3333/ranking');
      fetchRanking();
    } catch (error) {
      console.error('Erro ao resetar ranking', error);
    }
  }

  function handlePlayAgain() {
    resetGame();
    navigation.navigate('Home');
  }

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim de Jogo! 🎮</Text>
      
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>{playerName}, sua pontuação foi:</Text>
        <Text style={styles.scoreValue}>{finalScore} <Text style={styles.scoreMax}>/ 6</Text></Text>
      </View>

      <Text style={styles.rankingTitle}>🏆 TOP 5 - RANKING</Text>

      {loadingRanking ? (
        <ActivityIndicator size="small" color="#00b37e" style={{ marginVertical: 20 }} />
      ) : (
        <FlatList
          data={ranking}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          renderItem={({ item, index }) => (
            <View style={[styles.rankingItem, item.name === playerName && styles.highlightItem]}>
              <Text style={styles.position}>{index + 1}º</Text>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.score}>{item.score} pts</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum placar registrado ainda.</Text>
          }
        />
      )}

      {/* Aplicando o componente Button reutilizável */}
      <Button 
        title="Jogar Novamente" 
        onPress={handlePlayAgain} 
        style={styles.buttonPlayAgain}
      />

      <TouchableOpacity style={styles.buttonReset} onPress={handleResetRanking}>
        <Text style={styles.resetText}>Zerar Placar Geral</Text>
      </TouchableOpacity>
    </View>
  );
}