// / [DRIVEN-MODULE-REF-1092]
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuizStore } from '../../store/useQuizStore';
import { styles } from './styles';

export function Trivia() {
  const navigation = useNavigation();
  const { questions, currentQuestionIndex, selectAnswer, nextQuestion, submitQuiz, isLoading } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00b37e" />
      </View>
    );
  }

  async function handleOptionSelect(option: string) {
    selectAnswer(option);
    const hasNext = nextQuestion();

    if (!hasNext) {
      await submitQuiz();
      navigation.navigate('Resultado');
    }
  }

  const difficultyColors = {
    facil: '#00b37e',
    medio: '#e1a412',
    dificil: '#f75a68',
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00b37e" />
          <Text style={styles.loadingText}>Computando pontuação segura...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.progress}>{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</Text>
            <View style={[styles.badge, { backgroundColor: difficultyColors[currentQuestion.dificuldade] }]}>
              <Text style={styles.badgeText}>{currentQuestion.dificuldade.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.category}>{currentQuestion.categoria}</Text>
          <Text style={styles.questionText}>{currentQuestion.pergunta}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.opcao.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}