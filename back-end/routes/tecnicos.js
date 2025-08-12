import express from 'express';
import db from '../db/db.js';
import bcrypt from 'bcryptjs';


const router = express.Router();

router.get('/tecnicos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tecnicos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New endpoint to get a technician by ID
router.get('/tecnicos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM tecnicos WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tecnico not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tecnicos', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email and senha are required' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const result = await db.query(
      'INSERT INTO tecnicos (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/tecnicos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  try {
    let result;
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);
      result = await db.query(
        'UPDATE tecnicos SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
        [nome, email, hashedPassword, id]
      );
    } else {
      result = await db.query(
        'UPDATE tecnicos SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [nome, email, id]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Técnico não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;