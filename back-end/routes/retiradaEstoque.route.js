import express from 'express';
import db from '../db/db.js';
import validateToken from '../services/auth.guard.js';

const router = express.Router();

router.post("/retirada-estoque", async (req, res) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const { item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;

        // Verifica se o item existe no estoque
        const estoqueResult = await client.query("SELECT * FROM estoque WHERE numero_serie = $1", [numero_serie]);
        if (estoqueResult.rows.length === 0) {
            throw new Error('Item não encontrado no estoque.');
        }

        const itemEstoque = estoqueResult.rows[0];

        // Verifica se a quantidade a ser retirada é válida
        if (itemEstoque.quantidade < quantidade) {
            throw new Error('Quantidade a ser retirada maior que a disponível no estoque.');
        }

        // Insere na tabela de retirada
        const retiradaValues = [item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao];
        const { rows: retiradaRows } = await client.query(
            "INSERT INTO retirada_estoque (item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            retiradaValues
        );

        // Atualiza a quantidade no estoque
        const novaQuantidade = itemEstoque.quantidade - quantidade;
        if (novaQuantidade === 0) {
            // Remove o item do estoque se a quantidade for zero
            await client.query("DELETE FROM estoque WHERE id = $1", [itemEstoque.id]);
        } else {
            // Apenas atualiza a quantidade
            await client.query("UPDATE estoque SET quantidade = $1 WHERE id = $2", [novaQuantidade, itemEstoque.id]);
        }

        await client.query('COMMIT');
        res.json(retiradaRows[0]);

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
        console.log(err);
    } finally {
        client.release();
    }
});

router.get("/retirada-estoque", async(req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({error: "Token inválido ou ausente"});
    }
    try {
        const { rows } = await db.query("SELECT * FROM retirada_estoque ORDER BY id DESC");
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
        console.log(err);
    }
});

export default router;