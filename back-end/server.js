import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import osRouter from './routes/ordens.js'; // importa suas rotas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use('/', osRouter);

// Teste de conexão com o banco
app.get('/ping', async (req, res) => {
  try {
    const result = await (await import('./db.js')).default.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
