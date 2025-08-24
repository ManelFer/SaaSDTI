import express from 'express';
import db from '../db/db.js';
import validateToken from '../services/auth.guard.js';
import { atualizarDefensor } from '../db/tables/defensor.js';

const router = express.Router();

// Rota para listar
router.get('/defensores', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const { rows } = await db.query('SELECT * FROM defensores ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para criar
router.post('/defensores', async (req, res) => {
    const { nome } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO defensores (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//put- atualizar um defensor
router.put('/defensores/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const updateDefensor = await atualizarDefensor(id, { nome });
        res.json(updateDefensor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// adicionar outras rotas de CRUD conforme necessário
export default router;
