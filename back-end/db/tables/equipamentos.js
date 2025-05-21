import db from '../db.js';

export function criarTabelaEquipamentos() {
    const query = `
        CREATE TABLE IF NOT EXISTS equipamentos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

// adicionar 
export async function adicionarEquipamento(nome) {
    const query = `
        INSERT INTO equipamentos (nome)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows[0];
}
// READ 
export async function obterTodosEquipamentos() {
    const query = `
        SELECT * FROM equipamentos
        ORDER BY nome;
    `;
    const result = await db.query(query);
    return result.rows;
}

// READ - 
export async function obterEquipamentoPorId(id) {
    const query = `
        SELECT * FROM equipamentos
        WHERE id = $1;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}
// UPDATE 
export async function atualizarEquipamento(id, nome) {
    const query = `
        UPDATE equipamentos
        SET nome = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const values = [nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// DELETE 
export async function removerEquipamento(id) {
    const query = `
        DELETE FROM equipamentos
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

