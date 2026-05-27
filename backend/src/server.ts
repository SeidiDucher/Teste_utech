import express from 'express';
import cors from 'cors';
import { routes } from './routes/routes.js';
import { CONFIG } from './config/constants.js';

// Inicialização do Servidor Express

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(CONFIG.PORT, () => {
  console.log(` Servidor rodando rodando na porta ${CONFIG.PORT}`);
});