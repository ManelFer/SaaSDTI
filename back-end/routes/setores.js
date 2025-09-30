import express from "express";
import db from "../db/db.js";
import validateToken from "../services/auth.guard.js";

const router = express.Router();

router.get("/setores", async (req, res) => {
  if (!validateToken(req.headers.authorization)) {
    return res.status(401).json({ error: "Token inválido ou ausente" });
  }
  try {
    const { rows } = await db.query("SELECT * FROM setores ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/setores", async(req, res) => {
  const { nome } = req.body;
  try {
    const { rows} = await db.query(
      'INSERT INTO setores(nome) VALUES($1) RETURNING *',
      [nome]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// metodo DELETE 
router.delete("/setores/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM setores WHERE id = $1', [id]);
    if (rowCount === 0){
      return res.status(404).json({error: "Setor nao encontrado"});
    }
    res.status(204).send();
    console.log(`Setor com ID ${id} deletado com sucesso.`);
  } catch (err){
    res.status(500).json({error: err.message});
    console.error("Erro ao deletar setor:", err);
  }
})
export default router;