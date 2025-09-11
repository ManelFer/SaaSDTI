import express from 'express';
import db from '../db/db.js';
import { inserirOrdemServico, atualizarOrdemServico } from '../db/tables/ordens_servico.js'; 
import multer from 'multer';

// Configuração do Multer para armazenamento em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// POST nova OS com upload de arquivo
router.post('/os', upload.single('arquivo'), async (req, res) => {
  const {
    numero_os, data_abertura, solicitante, setor_id, patrimonio,
    tipo_falha, solucao_tecnica, tecnico_responsavel_id,
    data_recolhimento, data_devolucao, data_fechamento, status
  } = req.body;

  // O buffer do arquivo estará em req.file.buffer
  const arquivo = req.file ? req.file.buffer : null;

  try {
    // Verificar OS duplicada
    const checkQuery = 'SELECT * FROM ordens_servico WHERE numero_os = $1';
    const { rows: existing } = await db.query(checkQuery, [numero_os]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Número da OS já existe.' });
    }

    const values = [
      numero_os, data_abertura, solicitante, setor_id, patrimonio,
      tipo_falha, solucao_tecnica, tecnico_responsavel_id,
      data_recolhimento, data_devolucao, data_fechamento, status, arquivo
    ];

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
