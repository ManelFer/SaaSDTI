import express from 'express';
import db from '../db/db.js';
import validateToken from '../services/auth.guard.js';
import { atualizarEstagiario } from '../db/tables/estagiario.js';

const router = express.Router();

router.post('/estagiarios', async (req, res) => {
    const { nome } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO estagiarios (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/estagiarios', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const { rows } = await db.query('SELECT * FROM estagiarios ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// put - metodo para atualizar estagiarios
router.put('/estagiarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const updateEstagiario = await atualizarEstagiario(id, { nome });
        res.json(updateEstagiario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// fazer depois os outros métodos de CRUD

export default router;