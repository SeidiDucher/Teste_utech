import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';
import { RankingController } from '../controllers/rankingController.js';

const routes = Router();
const quizController = new QuizController();
const rankingController = new RankingController();

// Definição de Rotas da API

routes.get('/health-check', (req, res) => {
  res.json({ status: 'verified' });
});

// Rotas do Jogo
routes.get('/quiz', quizController.getQuiz);
routes.post('/quiz/submit', quizController.submitAnswers);

// Rotas do Ranking
routes.get('/ranking', rankingController.getTopFive);
routes.delete('/ranking', rankingController.resetRanking); // Bônus

export { routes };