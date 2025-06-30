import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.post("/retirada-estoque", async (req, res) => {
    try {
        const { item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao } = req.body;
        const values = [item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao];
        const { rows } = await db.query(
            "INSERT INTO retirada_estoque (item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            values
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
})

router.get("/retirada-estoque", async(req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM retirada_estoque ORDER BY id DESC");
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
        console.log(err);
    }
});

export default router;