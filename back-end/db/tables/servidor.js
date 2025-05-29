// tabela de servidores publicos da defensoria publica
import db from '../db.js';

// Função para criar a tabela de servidores
export function criarTabelaServidores() {
    const query = `
        CREATE TABLE IF NOT EXISTS servidores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

//função para adicionar um novo servidor
export async function adicionarServidor(nome) {
    const query = `
        INSERT INTO servidores (nome)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows[0];
}

// Função para obter todos os servidores
export async function obterTodosServidores() {
    const query = `
        SELECT * FROM servidores
        ORDER BY nome;
    `;
    const result = await db.query(query);
    return result.rows;
}

// função para deletar um servidor por ID
export async function deletarServidorPorId(id) {
    const query = `
        DELETE FROM servidores
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}


// função para atualizar um servidor
export async function atualizarServidor(id, nome) {
    const query = `
        UPDATE servidores
        SET nome = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const values = [nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
}