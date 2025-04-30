import express from 'express';
import db from '../db/db.js';
import { inserirOrdemServico } from '../db/tables/ordens_servico.js'; // Importa a função de inserção de OS

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

// Get setores
// router.get('/setores', async (req, res) => {
//   try {
//     const { rows } = await db.query('SELECT * FROM setores ORDER BY id DESC');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Função converter campos de data vazios em null
function toNullableTimestamp(value) {
  return value === '' ? null : value;
}

// POST nova OS
router.post('/ordens', async (req, res) => {
  console.log('HEADERS:', req.headers['content-type']);
  console.log('BODY:', req.body);
  const {
    numero_os, data_abertura, solicitante, setor_id, patrimonio,
    tipo_falha, solucao_tecnica, tecnico_responsavel,
    data_recolhimento, data_devolucao, data_fechamento, status
  } = req.body;


  try {
    // verificar os duplicada
    const checkQuery = 'SELECT * FROM ordens_servico WHERE numero_os = $1';
    const checkValues = [numero_os];
    const { rows: existing } = await db.query(checkQuery, checkValues);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Número da OS já existe.' });
    }
    // const query = `
    //   INSERT INTO ordens_servico (
    //     numero_os, data_abertura, solicitante, setor, patrimonio,
    //     tipo_falha, solucao_tecnica, tecnico_responsavel,
    //     data_recolhimento, data_devolucao, data_fechamento, status
    //   )
    //   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    //   RETURNING *;
    // `;
    const values = [
      numero_os, data_abertura, solicitante, setor_id, patrimonio,
      tipo_falha, solucao_tecnica, tecnico_responsavel,
      data_recolhimento, data_devolucao, data_fechamento, status
    ];
    // console.log('Query:', query);
    console.log("Receido no back-end:", req.body);

    const { rows } = await inserirOrdemServico(values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
