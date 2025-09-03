import express from 'express';
import {
    adicionarAlocacao,
    obterTodasAlocacoes,
    obterAlocacaoPorId,
    atualizarAlocacao,
    removerAlocacao
} from '../db/tables/alocacao.js';
import validateToken from '../services/auth.guard.js';

const router = express.Router();

// Rota para criar uma nova alocação
router.post('/alocacao', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const novaAlocacao = await adicionarAlocacao(req.body);
        res.status(201).json(novaAlocacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para obter todas as alocações
router.get('/alocacao', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const alocacoes = await obterTodasAlocacoes();
        res.json(alocacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para obter uma alocação por ID
router.get('/alocacao/:id', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { id } = req.params;
    try {
        const alocacao = await obterAlocacaoPorId(id);
        if (!alocacao) {
            return res.status(404).json({ error: 'Alocação não encontrada' });
        }
        res.json(alocacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar uma alocação
router.put('/alocacao/:id', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { id } = req.params;
    try {
        const alocacaoAtualizada = await atualizarAlocacao(id, req.body);
        if (!alocacaoAtualizada) {
            return res.status(404).json({ error: 'Alocação não encontrada' });
        }
        res.json(alocacaoAtualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para remover uma alocação
router.delete('/alocacao/:id', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { id } = req.params;
    try {
        const alocacaoRemovida = await removerAlocacao(id);
        if (!alocacaoRemovida) {
            return res.status(404).json({ error: 'Alocação não encontrada' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
