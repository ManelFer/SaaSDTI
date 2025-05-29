// tabela de defensores publicos
import db from '../db.js';

// Função para criar a tabela de defensores públicos
export function criarTabelaDefensores() {
    const query = `
        CREATE TABLE IF NOT EXISTS defensores (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

// CREATE - Adicionar um novo defensor público
export async function adicionarDefensor(nome) {
    const query = `
        INSERT INTO defensores (nome)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows[0];
}

// READ - Obter todos os defensores públicos
export async function obterTodosDefensores() {
    const query = `
        SELECT * FROM defensores
        ORDER BY nome;
    `;
    const result = await db.query(query);
    return result.rows;
}

// UPDATE - Atualizar um defensor público
export async function atualizarDefensor(id, nome) {
    const query = `
        UPDATE defensores
        SET nome = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const values = [nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// DELETE - Remover um defensor público
export async function removerDefensor(id) {
    const query = `
        DELETE FROM defensores
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}