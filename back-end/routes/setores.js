import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.get("/setores", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM setores ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;