import express from 'express';
import db from '../db/db.js';
import { inserirOrdemServico, atualizarOrdemServico } from '../db/tables/ordens_servico.js'; 
// import validateToken from '../services/auth.guard.js';

const router = express.Router();

// GET todas as OSs
router.get('/os', async (req, res) => {
  // if (!validateToken(req.headers.authorization)) {
  //   return res.status(401).json({ error: 'Token inválido ou ausente' });
  // }
  try {
    const { rows } = await db.query('SELECT * FROM ordens_servico ORDER BY id DESC');
    toNullableTimestamp(rows);
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
  return value === 'sem dados' ? null : value;
}

// POST nova OS
router.post('/os', async (req, res) => {
  console.log('HEADERS:', req.headers['content-type']);
  console.log('BODY:', req.body);
  const {
    numero_os, data_abertura, solicitante, setor_id, patrimonio,
    tipo_falha, solucao_tecnica, tecnico_responsavel_id,
    data_recolhimento, data_devolucao, data_fechamento, status, arquivo
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
      tipo_falha, solucao_tecnica, tecnico_responsavel_id,
      data_recolhimento, data_devolucao, data_fechamento, status, arquivo
    ];
    // console.log('Query:', query);
    console.log("Recebido no back-end:", req.body);

    const { rows } = await inserirOrdemServico(values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT rota para atualizar uma ordem de serviço
router.put('/os/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await atualizarOrdemServico(id, req.body);
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar ordem de serviço:', err);
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar uma ordem de serviço
router.delete('/os/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = 'DELETE FROM ordens_servico WHERE id = $1';
    const { rowCount } = await db.query(deleteQuery, [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Ordem de serviço não encontrada.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar ordem de serviço:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
