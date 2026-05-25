import { Request, Response } from 'express';
import { getDatabaseConnection } from '../database/connection.js';

// Controlador do Ranking (Top 5 e Reset)

export class RankingController {
  
  // GET /ranking
  async getTopFive(req: Request, res: Response): Promise<void> {
    try {
      const db = await getDatabaseConnection();
      
      // Busca apenas os 5 melhores ordenados por pontuação e depois pelos mais recentes
      const topFive = await db.all(
        'SELECT id, name, score, createdAt FROM ranking ORDER BY score DESC, createdAt DESC LIMIT 5'
      );

      res.json(topFive);
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao buscar o ranking', details: error.message });
    }
  }

  // DELETE /ranking (Ponto Extra: Opção para reiniciar/zerar o ranking)
  async resetRanking(req: Request, res: Response): Promise<void> {
    try {
      const db = await getDatabaseConnection();
      await db.run('DELETE FROM ranking');
      
      res.json({ message: 'Ranking reiniciado com sucesso!' });
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao zerar o ranking', details: error.message });
    }
  }
}