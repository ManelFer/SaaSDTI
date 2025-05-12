import db from '../db.js';


// Função para criar a tabela (já fornecida)
export function criarTabelaMarcas() {
    const query = `
        CREATE TABLE IF NOT EXISTS marcas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

// CREATE - Adicionar uma nova marca
 

// READ - Obter todas as marcas
export async function obterTodasMarcas() {
    const query = `
        SELECT * FROM marcas
        ORDER BY nome;
    `;
    const result = await db.query(query);
    return result.rows;
}

// READ - Obter uma marca por ID
export async function obterMarcaPorId(id) {
    const query = `
        SELECT * FROM marcas
        WHERE id = $1;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// UPDATE - Atualizar uma marca
export async function atualizarMarca(id, nome) {
    const query = `
        UPDATE marcas
        SET nome = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const values = [nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// DELETE - Remover uma marca
export async function removerMarca(id) {
    const query = `
        DELETE FROM marcas
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// Funções adicionais úteis

// Verificar se marca existe por nome
export async function marcaExistePorNome(nome) {
    const query = `
        SELECT EXISTS(SELECT 1 FROM marcas WHERE nome = $1);
    `;
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows[0].exists;
}

// Obter marcas com paginação
export async function obterMarcasPaginado(limite, offset) {
    const query = `
        SELECT * FROM marcas
        ORDER BY nome
        LIMIT $1 OFFSET $2;
    `;
    const values = [limite, offset];
    const result = await db.query(query, values);
    return result.rows;
}

// Contar total de marcas
export async function contarMarcas() {
    const query = `
        SELECT COUNT(*) FROM marcas;
    `;
    const result = await db.query(query);
    return parseInt(result.rows[0].count);
}

