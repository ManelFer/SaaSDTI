import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import osRouter from './routes/ordens.js'; // importa suas rotas
import seRouter from './routes/setores.js'; // importa suas rotas
import esRouter from './routes/estoque.js'; // importa suas rotas estoque
import teRouter from './routes/tecnicos.js'; // importa suas rotas tecnicos
import maRouter from './routes/marcas.js'; // importa suas rotas marcas
import liRouter from './routes/lixao.route.js'; // importa suas rotas lixao
import eqRouter from './routes/equipamento.route.js'; // importa suas rotas equipamentos
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
app.use('/', seRouter);
app.use('/', esRouter);
app.use('/', teRouter);
app.use('/', maRouter);
app.use('/', liRouter);
app.use('/', eqRouter);

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