import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET todas as OSs
router.get('/os', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM ordens_servico ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST nova OS
router.post('/ordens', async (req, res) => {
  const {
    numero_os, data_abertura, solicitante, setor, patrimonio,
    tipo_falha, solucao_tecnica, tecnico_responsavel,
    data_recolhimento, data_devolucao, data_fechamento, status
  } = req.body;

  try {
    const query = `
      INSERT INTO ordens_servico (
        numero_os, data_abertura, solicitante, setor, patrimonio,
        tipo_falha, solucao_tecnica, tecnico_responsavel,
        data_recolhimento, data_devolucao, data_fechamento, status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      numero_os, data_abertura, solicitante, setor, patrimonio,
      tipo_falha, solucao_tecnica, tecnico_responsavel,
      data_recolhimento, data_devolucao, data_fechamento, status
    ];

    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
