import express from 'express';
import db from '../db/db.js';
import  validateToken  from '../services/auth.guard.js'; 

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
    // Verifica se o token é válido proteção de rota
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({error: "Token inválido ou ausente"});
    }
    try {
        const {rows} = await db.query("SELECT * FROM estoque ORDER BY id DESC");
        res.json(rows);
    } catch (err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
})

// rota para deletar um item do estoque
router.delete('/estoque/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const {rowCount} = await db.query("DELETE FROM estoque WHERE id = $1", [id]);
        if (rowCount === 0) {
            return res.status(404).json({error: "Aparelho não encontrado"});
        }
        res.status(204).send();
        console.log(`Aparelho com ID ${id} deletado com sucesso.`);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.error("Erro ao deletar aparelho:", err);
    }
});
export default router;