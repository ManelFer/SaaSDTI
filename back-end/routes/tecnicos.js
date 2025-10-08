import express from 'express';
import db from '../db/db.js';
import bcrypt from 'bcryptjs';


const router = express.Router();

router.get('/tecnicos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tecnicos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New endpoint to get a technician by ID
router.get('/tecnicos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM tecnicos WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tecnico not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tecnicos', async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha || !role) {
    return res.status(400).json({ error: 'Nome, email, senha e role são obrigatórios' });
  }

  const roleValue = role;
  if (!['tecnico', 'admin'].includes(roleValue)) {
    return res.status(400).json({ error: 'Role inválido. Deve ser "tecnico" ou "admin".' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const result = await db.query(
      'INSERT INTO tecnicos (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, created_at, updated_at',
      [nome, email, hashedPassword, roleValue]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
        return res.status(409).json({ error: 'O e-mail fornecido já está em uso.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao criar o técnico.' });
    console.log(err, " o erro é devido a", err.code)
  }
});

router.put('/tecnicos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, senhaAtual } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM tecnicos WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Técnico não encontrado' });
    }
    const user = userResult.rows[0];

    const fieldsToUpdate = {};
    if (nome) fieldsToUpdate.nome = nome;
    if (email) fieldsToUpdate.email = email;

    if (senha) {
      if (!senhaAtual) {
        return res.status(400).json({ error: 'A senha atual é necessária para definir uma nova senha.' });
      }
      const isMatch = await bcrypt.compare(senhaAtual, user.senha);
      if (!isMatch) {
        return res.status(401).json({ error: 'A senha atual está incorreta.' });
      }
      const salt = await bcrypt.genSalt(10);
      fieldsToUpdate.senha = await bcrypt.hash(senha, salt);
    }

    const queryParts = [];
    const queryValues = [];
    let queryIndex = 1;

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
        queryParts.push(`${key} = $${queryIndex++}`);
        queryValues.push(value);
    }

    if (queryParts.length === 0) {
        if (senhaAtual && !senha) {
            return res.status(200).json({ message: "Senha atual verificada." });
        }
        return res.status(400).json({ error: 'Nenhum dado para atualizar.' });
    }

    queryValues.push(id);
    const updateQuery = `UPDATE tecnicos SET ${queryParts.join(', ')} WHERE id = $${queryIndex} RETURNING *`;

    const result = await db.query(updateQuery, queryValues);
    
    const { senha: _, ...tecnicoAtualizado } = result.rows[0];
    return res.json(tecnicoAtualizado);

  } catch (err) {
    if (err.code === '23505') { // unique_violation
        return res.status(409).json({ error: 'O e-mail fornecido já está em uso.' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor ao atualizar o técnico.' });
  }
});

// DELETE
router.delete('/tecnicos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM tecnicos WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tecnico not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;