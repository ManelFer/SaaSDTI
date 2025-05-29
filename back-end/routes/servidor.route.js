import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.post('/servidores', async (req, res) => {
    const { nome } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO servidores (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/servidores', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM servidores ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Implementar os outros métodos de CRUD (Read, Update, Delete) conforme necessário

export default router;