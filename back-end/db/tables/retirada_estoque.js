import db from "../db.js";

export function criarTabelaRetiradaEstoque() {
    const query = `
        CREATE TABLE IF NOT EXISTS retirada_estoque (
            id SERIAL PRIMARY KEY,
            item_id VARCHAR(255) NOT NULL,
            marca_id VARCHAR(255) NOT NULL,
            modelo VARCHAR(255) NOT NULL,
            numero_serie VARCHAR(255) NOT NULL UNIQUE,
            patrimonio VARCHAR(255) UNIQUE,
            lote VARCHAR(255) ,
            quantidade INTEGER DEFAULT 0,
            descricao VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

export async function inserirItemRetiradaEstoque(values) {
    const query = `
        INSERT INTO retirada_estoque (
            item_id,
            marca_id,
            modelo,
            numero_serie,
            patrimonio,
            lote,
            quantidade,
            descricao
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const result = await db.query(query, values);
    return result.rows[0];
}

export async function listarItemsRetiradaEstoque() {
    const query = `
        SELECT * FROM retirada_estoque;
    `;
    const result  = await db.query(query);
    return result.rows;
}

// obter uma marca por ID
export async function obterItemRetiradaEstoquePorId(id) {
    const query = `
        SELECT * FROM retirada_estoque
        WHERE id = $1;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// atualizar um item do estoque
export async function atualizarItemsRetiradaEstoque(id, data) {
    const updateQuery = `
        UPDATE retirada_estoque
        SET 
            item_id = $1, 
            marca_id = $2, 
            modelo = $3, 
            numero_serie = $4, 
            patrimonio = $5, 
            lote = $6,
            quantidade = $7,
            descricao = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *;
    `;
    const values = [
        data.item_id,
        data.marca_id,
        data.modelo,
        data.numero_serie,
        data.patrimonio,
        data.lote,
        data.quantidade,
        data.descricao,
        id,
    ];
    const result = await db.query(updateQuery, values);
    return result.rows[0];
}
// deletar um item do estoque
export async function deletarItemRetiradaEstoque(id) {
    const deleteQuery = `
        DELETE FROM retirada_estoque
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(deleteQuery, values);
    return result.rows[0];
}