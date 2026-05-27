// / [DRIVEN-MODULE-REF-1092]
import { CONFIG } from '../config/constants.js';
import { QuizQuestion, QuizCache, ClientQuestion } from '../@types/quiz.js';

// Regras de negocio, filtro de dificuldade e cache inteligente
class QuizService{
    private cache: QuizCache | null = null;

    //funcão para embaralhar as opções
    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i]!; shuffled[i] = shuffled[j]!; shuffled[j] = temp;
        }
        return shuffled;
    }

    // busca as questões da API externa, aplica cache e regras de negócio
    private async refreshCache(): Promise<void> {
    try {
      const response = await fetch(CONFIG.EXTERNAL_API_URL);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API externa: ${response.statusText}`);
      }

      const raw = await response.json() as any;

      // A API Tryvia retorna os dados dentro da propriedade "results"
      const questionsList = Array.isArray(raw.results) ? raw.results : (Array.isArray(raw) ? raw : []);

      // Mapear/normalizar o JSON externo para o modelo interno (QuizQuestao)
      const allQuestions: QuizQuestion[] = questionsList.map((q: any, idx: number) => {
        const difficultyRaw = (q.difficulty ?? q.dificuldade ?? '').toString().toLowerCase();
        const difficulty = difficultyRaw.startsWith('e') || difficultyRaw === 'easy' ? 'easy'
          : (difficultyRaw.startsWith('m') || difficultyRaw === 'medium' ? 'medium' : 'hard');

        return {
          id: q.id ?? String(idx),
          category: q.category ?? q.categoria ?? 'geral',
          difficulty,
          question: q.question ?? q.pergunta ?? '',
          correctAnswer: q.correct_answer ?? q.respostaCorreta ?? '',
          incorrectAnswers: q.incorrect_answers ?? q.respostaErrada ?? []
        } as QuizQuestion;
      });

      // Filtrando e separando por dificuldade (já normalizado)
      const easyQuestions = allQuestions.filter(q => q.difficulty === 'easy');
      const mediumQuestions = allQuestions.filter(q => q.difficulty === 'medium');
      const hardQuestions = allQuestions.filter(q => q.difficulty === 'hard');

      // Embaralha cada bloco e pega no máximo 20 de cada (conforme regra do teste)
      const easyPool = this.shuffleArray(easyQuestions).slice(0, CONFIG.POOL_SIZE_PER_DIFFICULTY);
      const mediumPool = this.shuffleArray(mediumQuestions).slice(0, CONFIG.POOL_SIZE_PER_DIFFICULTY);
      const hardPool = this.shuffleArray(hardQuestions).slice(0, CONFIG.POOL_SIZE_PER_DIFFICULTY);

      // Salva no estado da aplicação com o timestamp atual
      this.cache = {
        questions: [...easyPool, ...mediumPool, ...hardPool],
        updateTime: Date.now()
      };
      
      console.log('🔄 Cache de perguntas atualizado com sucesso!');
    } catch (error) {
      console.error('❌ Falha ao atualizar o cache de perguntas:', error);
      throw new Error('Serviço de perguntas temporariamente indisponível.');
    }
  }
  // Garante que o cache exista e esteja válido dentro dos 10 minutos
  private async ensureValidCache(): Promise<QuizQuestion[]> {
    const now = Date.now();
    
    // Se não tem cache ou se passou de 10 minutos (CONFIG.CACHE_DURATION_MS), atualiza
    if (!this.cache || (now - this.cache.updateTime) > CONFIG.CACHE_DURATION_MS) {
      await this.refreshCache();
    }

    return this.cache!.questions;
  }

  // Gera a partida contendo as 6 perguntas nas proporções exatas (3 fáceis, 2 médias, 1 difícil)
  public async generateGameQuiz(): Promise<ClientQuestion[]> {
    const cachedQuestions = await this.ensureValidCache();

    // Separa o pool atual do cache por dificuldade
    const easyPool = cachedQuestions.filter(q => q.difficulty === 'easy');
    const mediumPool = cachedQuestions.filter(q => q.difficulty === 'medium');
    const hardPool = cachedQuestions.filter(q => q.difficulty === 'hard');

    // Sorteia a quantidade exata exigida pelo enunciado
    const selectedEasy = this.shuffleArray(easyPool).slice(0, CONFIG.GAME_RULES.EASY_COUNT);
    const selectedMedium = this.shuffleArray(mediumPool).slice(0, CONFIG.GAME_RULES.MEDIUM_COUNT);
    const selectedHard = this.shuffleArray(hardPool).slice(0, CONFIG.GAME_RULES.HARD_COUNT);

    const finalSelection = [...selectedEasy, ...selectedMedium, ...selectedHard];

    // Mapeia para o formato do Cliente (ocultando a resposta correta e unificando as opções)
    return finalSelection.map(q => {
      const options = this.shuffleArray([q.correctAnswer, ...q.incorrectAnswers]);
      
      return {
        id: q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        options: options
      };
    });
  }

  // Método para validar se uma resposta está correta (será usado quando o front enviar as respostas)
  public async verifyAnswer(questionId: string, answer: string): Promise<boolean> {
    const cachedQuestions = await this.ensureValidCache();
    const originalQuestion = cachedQuestions.find(q => q.id === questionId);

    if (!originalQuestion) return false;
    return originalQuestion.correctAnswer === answer;
  }
}

export const quizService = new QuizService();
