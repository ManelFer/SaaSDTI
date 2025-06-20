import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.post("/estoque", async (req, res) => {
    try {
        const {item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade} = req.body;
        const values = [item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade];
        const {rows} = await db.query("INSERT INTO estoque (item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", values);
        res.json(rows[0]);
    } catch (err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
})


router.get("/estoque", async (req, res) => {
    try {
        const {rows} = await db.query("SELECT * FROM estoque ORDER BY id DESC");
        res.json(rows);
    } catch (err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
})

export default router;