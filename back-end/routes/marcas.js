import express from 'express';
import db from '../db/db.js';
import validateToken from '../services/auth.guard.js';

const router = express.Router();

// Rota para criar uma nova marca
router.post('/marcas', async (req, res) => {
  const { nome } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO marcas (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para obter todas as marcas
router.get('/marcas', async (req, res) => {
  if (!validateToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Token inválido ou ausente' });
  }
  try {
    const { rows } = await db.query('SELECT * FROM marcas ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para obter uma marca por ID
router.get('/marcas/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM marcas WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// rota para deletar uma marca
router.delete('/marcas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM marcas WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }
    res.status(204).send();
    console.log(`Marca com ID ${id} deletada com sucesso.`);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error('Erro ao deletar marca:', err);
  }
});
export default router;