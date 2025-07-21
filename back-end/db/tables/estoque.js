import db from "../db.js";

export function criarTabelaEstoque() {
  const query = `
        CREATE TABLE IF NOT EXISTS estoque (
        id SERIAL PRIMARY KEY,
        item_id VARCHAR(255) NOT NULL,
        marca_id VARCHAR(255) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        numero_serie VARCHAR(255) NOT NULL UNIQUE,
        patrimonio VARCHAR(255) UNIQUE,
        lote VARCHAR(255) ,
        quantidade INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  return db.query(query);
}

export async function inserirItemEstoque(values) {
  const insertQuery = `
        INSERT INTO estoque (item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
  const result = await db.query(insertQuery, values);
  return result.rows[0];
}


export async function listarItemsEstoque() {
  const query = `
        SELECT * FROM estoque;
    `;
  const result = await db.query(query);
  return result.rows;
}

export async function atualizarItemsEstoque(id, data) {
  const updateQuery = `
        UPDATE estoque
        SET 
            item_id = $1, 
            marca_id = $2, 
            modelo = $3, 
            numero_serie = $4, 
            patrimonio = $5, 
            lote = $6,
            quantidade = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
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
    id,
  ];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

export async function deletarItemEstoque(id) {
    const deleteQuery = `
            DELETE FROM estoque
            WHERE id = $1
            RETURNING *;
        `;
    const result = await db.query(deleteQuery, [id]);
    return result.rows[0];
}