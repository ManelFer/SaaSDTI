import express from 'express';
import db from '../db/db.js';
import { inserirItemLixao, listarItemsLixao, atualizarItemsLixao, deletarItemLixao } from '../db/tables/lixao.js'; // Importa a função de inserção de OS

const router = express.Router();

// GET todas os itens do lixão
router.get('/lixao', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM lixao ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo item no lixão
router.post('/lixao', async (req, res) => {
  const { nome, marca, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;

  try {
    const values = [nome, marca, modelo, numero_serie, patrimonio, lote, quantidade, descricao];
    const newItem = await inserirItemLixao(values);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT atualizar item do lixão
router.put('/lixao/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, marca, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;

  try {
    const updatedItem = await atualizarItemsLixao(id, { nome, marca, modelo, numero_serie, patrimonio, lote, quantidade, descricao });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE item do lixão
router.delete('/lixao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deletarItemLixao(id);
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;