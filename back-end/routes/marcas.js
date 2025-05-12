import express from 'express';
import db from '../db/db.js';

const router = express.Router();
// Rota para obter todas as marcas
router.get('/marcas', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM marcas ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para obter uma marca por ID
export default router;