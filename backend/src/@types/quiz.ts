// o que vem de API externa
export interface QuizQuestao{
    id: string;
    categoria: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pergunta: string;
    respostaCorreta: string;
    respostaErrada: string[];
}

//o que back vai enviar
export interface ClienteQuestao{
    id: string;
    categoria: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pergunta: string;
    opcao: string[]; // resposta_correta + resposta_errada
}

//estrutura de memoria do servidor
export interface QuizCache{
    questoes: QuizQuestao[];
    updateTime: number;
}

// estrutura do ranking
export interface Pontuacao{
    idPlayer: number;
    nome: string;
    pontos: number;
    dataCriacao: Date;
}