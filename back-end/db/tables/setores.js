import db from '../db.js';

export function criarTabelaSetores () {
    const query = `
        CREATE TABLE IF NOT EXISTS setores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

export async function adicionarSetor(nome) {
    const query = `
        INSERT INTO setores (nome)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows[0];
}

//DELETE - Remover um setor
export async function deletarSetor(id) {
    const query = `
        DELETE FROM setores
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}