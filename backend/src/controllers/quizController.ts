import {Request, Response} from 'express';
import { getDatabaseConnection } from '../database/connection.js';
import { quizService } from '../services/quizService.js';

export class QuizController {
    
    //Get para gerar o quiz (6 perguntas)
    async getQuiz(req: Request, res: Response) {
        try {
            const question = await quizService.generateGameQuiz();
            res.json(question);
        } 
        catch (error: any) {
            res.status(500).json({ error: 'Erro ao gerar o quiz', details: error.message });
        }
    }

    //Post para receber o resultado do quiz e salvar no ranking
    async submitAnswers(req: Request, res: Response) {
        try {
            const { nome, answers } = req.body;

            if (!nome || !Array.isArray(answers)) {
                res.status(400).json({ error: 'Nome e answers são obrigatórios e answers deve ser um array' });
                return;
            }

            let finalScore = 0;

            //validação de cada resposta
            for (const item of answers) {
                if (!item || typeof item.questionId !== 'string' || typeof item.answer !== 'string') {
                    continue;
                }

                const isCorrect = await quizService.verifyAnswer(item.questionId, item.answer);
                if (isCorrect) {
                    finalScore++;
                }
            }
            // Salva automaticamente no banco de dados SQLite
            const db = await getDatabaseConnection();
            await db.run(
                'INSERT INTO ranking (name, score) VALUES (?, ?)',
                [nome, finalScore]
            );

            res.status(201).json({ nome, score: finalScore });
        }
        catch (error: any) {
            res.status(500).json({ error: 'Erro ao processar respostas', details: error.message });
        }
    }
}