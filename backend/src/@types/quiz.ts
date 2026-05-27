// o que vem de API externa
export interface QuizQuestion{
    id: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

//o que back vai enviar
export interface ClientQuestion{
    id: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    options: string[]; // resposta_correta + resposta_errada
}

//estrutura de memoria do servidor
export interface QuizCache{
    questions: QuizQuestion[];
    updateTime: number;
}

// estrutura do ranking
export interface Score{
    playerId: number;
    name: string;
    points: number;
    createdAt: Date;
}