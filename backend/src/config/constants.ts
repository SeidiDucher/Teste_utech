import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3333,
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL || 'EXTERNAL_API_URL=https://tryvia.ptr.red/api.php?amount=50',
  CACHE_DURATION_MS: 10 * 60 * 1000, // Pontos Extras: 10 minutos em milissegundos
  POOL_SIZE_PER_DIFFICULTY: 20,
  GAME_RULES: {
    EASY_COUNT: 3,
    MEDIUM_COUNT: 2,
    HARD_COUNT: 1,
    TOTAL_QUESTIONS: 6
  }
};