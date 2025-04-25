import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import osRouter from './routes/ordens.js'; // importa suas rotas
import { criarTabelas  }from './db/db.js'; // importa a função de criação de tabelas

dotenv.config();

await criarTabelas();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // URL do front-end
}));
app.use(express.json());

// Usa as rotas
app.use('/', osRouter);

// Teste de conexão com o banco
app.get('/ping', async (req, res) => {
  try {
    const result = await (await import('./db/db.js')).default.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});