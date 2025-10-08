import db from "../db.js";

export function criarTabelaTecnicos() {
  const query = `
        CREATE TABLE IF NOT EXISTS tecnicos 
        (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        role VARCHAR(25) DEFAULT 'tecnico',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT tecnicos_role_check CHECK (
            role IN ('tecnico', 'admin')
        )

        );
    `;
  return db.query(query);
}

//update
export function atualizarTabelaTecnicos(id, data) {
  const query = `
        UPDATE tecnicos
        SET
            nome = $1,
            email = $2,
            senha = $3,
            role = $4,
            updated_at = CURRENT_TIMESTAMP;
        WHERE id = $5;
        RETURNING *;
    `;
  const values = [data.nome, data.email, data.senha, data.role, id];
  const result = db.query(query, values);
  return result.rows[0];
}

// DELETE

export async function removerTecnico(id) {
  const query = `
        DELETE FROM tecnicos
        WHERE id = $1
        RETURNING *;
    `;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
}

// READ

export async function obterTecnicoPorId(id) {
  const query = `
        SELECT * FROM tecnicos
        WHERE id = $1;
    `;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
}

// POST

export async function adicionarTecnico(data) {
  const query = `
        INSERT INTO tecnicos (nome, email, senha, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  const values = [data.nome, data.email, data.senha, data.role];
  const result = await db.query(query, values);
  return result.rows[0];
}
