import express from 'express';
import db from '../db/db.js';
import validateToken from '../services/auth.guard.js';

const router = express.Router();

router.post('/equipamentos', async (req, res) => {
    const {nome} = req.body;
    try {
        const { rows} = await db.query(
            'INSERT INTO equipamentos (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/equipamentos', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const { rows } = await db.query('SELECT * FROM equipamentos ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// busca equipamento por id
router.get('/equipamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM equipamentos WHERE id = $1', [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'Equipamento não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// rota para deletar um equipamento
router.delete('/equipamentos/:id', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM equipamentos WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Equipamento nao encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;