import express from 'express';
import db from '../db/db.js';
import { inserirItemLixao, atualizarItemsLixao, deletarItemLixao } from '../db/tables/lixao.js';
import validateToken from '../services/auth.guard.js';

const router = express.Router();

// GET todas os itens do lixão
router.get('/lixao', async (req, res) => {
  if (!validateToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Token inválido ou ausente' });
  }
  try {
    const { rows } = await db.query('SELECT * FROM lixao ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo item no lixão
router.post('/lixao', async (req, res) => {
  const { item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;

  try {
    const values = [item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao];
    const newItem = await inserirItemLixao(values);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT atualizar item do lixão
router.put('/lixao/:id', async (req, res) => {
  const { id } = req.params;
  const { item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;

  try {
    const updatedItem = await atualizarItemsLixao(id, { item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE item do lixão
router.delete('/lixao/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const {rowCount} = await db.query('DELETE FROM lixao WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Item do lixão não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;