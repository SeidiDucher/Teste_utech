import {create} from 'zustand';
import axios from 'axios';
import { API_URL } from '../config/api';

export interface Questao{
    id: string;
    categoria: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pergunta: string;
    opcao: string[];
}

interface QuizResposta{
    questionId: string;
    answer: string;
}

interface QuizEstado{
    playerName: string;
    questions: Questao[];
    currentQuestionIndex: number;
    answers: QuizResposta[];
    isLoading: boolean;
    error: string | null;
    finalScore: number | null;

    // Ações (Actions)
    setPlayerName: (name: string) => void;
    fetchQuiz: () => Promise<void>;
    selectAnswer: (answer: string) => void;
    nextQuestion: () => boolean; // Retorna true se foi para a próxima, false se o quiz acabou
    submitQuiz: () => Promise<void>;
    resetGame: () => void;
}


export const useQuizStore = create<QuizEstado>((set, get) => ({
  playerName: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isLoading: false,
  error: null,
  finalScore: null,

  setPlayerName: (name) => set({ playerName: name }),

  // Busca as 6 perguntas do nosso Backend
  fetchQuiz: async () => {
    set({ isLoading: true, error: null, answers: [], currentQuestionIndex: 0, finalScore: null });
    try {
      const response = await axios.get<Questao[]>(`${API_URL}/quiz`);
      set({ questions: response.data, isLoading: false });
    } catch (err: any) {
      set({ error: 'Não foi possível carregar o quiz. Tente novamente.', isLoading: false });
    }
  },

  // Guarda a resposta para a pergunta atual
  selectAnswer: (answer) => {
    const { questions, currentQuestionIndex, answers } = get();
    const currentQuestion = questions[currentQuestionIndex];

    // Evita duplicar se o usuário mudar de ideia antes de avançar
    const filteredAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    
    set({
      answers: [...filteredAnswers, { questionId: currentQuestion.id, answer }]
    });
  },

  // Avança no índice do quiz
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
      return true; // Continua o jogo
    }
    return false; // Fim das perguntas
  },

  // Envia as respostas para o backend calcular a pontuação real e salvar no ranking
  submitQuiz: async () => {
    const { playerName, answers } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/quiz/submit`, {
        nome: playerName,
        answers
      });
      
      // O backend nos retorna a pontuação computada de forma segura
      set({ finalScore: response.data.score, isLoading: false });
    } catch (err: any) {
      set({ error: 'Erro ao enviar respostas do quiz.', isLoading: false });
    }
  },

  // Reseta o estado mantendo apenas o nome se o jogador quiser jogar de novo
  resetGame: () => set({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    error: null,
    finalScore: null
  })
}));