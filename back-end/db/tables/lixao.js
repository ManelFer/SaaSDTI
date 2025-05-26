import db from "../db.js";

export function criarTabelaLixao() {
  const query = `
        CREATE TABLE IF NOT EXISTS lixao (
        id SERIAL PRIMARY KEY,
        item_id VARCHAR(255) NOT NULL,
        marca_id VARCHAR(255) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        numero_serie VARCHAR(255) NOT NULL UNIQUE,
        patrimonio VARCHAR(255) UNIQUE,
        lote VARCHAR(255) UNIQUE,
        quantidade INTEGER DEFAULT 0,
        descricao VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  return db.query(query);
}

// Insertar um item no lixão
export async function inserirItemLixao(values) {
  const insertQuery = `
        INSERT INTO lixao (item_id, marca_id, modelo, numero_serie, patrimonio, lote, quantidade, descricao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
  const result = await db.query(insertQuery, values);
  return result.rows[0];
}

// Listar todos os itens do lixão
export async function listarItemsLixao() {
  const query = `
        SELECT * FROM lixao;
    `;
  const result = await db.query(query);
  return result.rows;
}

// Atualizar um item do lixão
export async function atualizarItemsLixao(id, data) {
  const updateQuery = `
        UPDATE lixao
        SET 
            item_id = $1, 
            marca_id = $2, 
            modelo = $3, 
            numero_serie = $4, 
            patrimonio = $5, 
            lote = $6,
            quantidade = $7,
            Descrição = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *;
    `;
  const values = [
    data.nome,
    data.marca,
    data.modelo,
    data.numero_serie,
    data.patrimonio,
    data.lote,
    data.quantidade,
    data.Descrição,
    id,
  ];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

// Deletar um item do lixão
export async function deletarItemLixao(id) {
  const deleteQuery = `
            DELETE FROM lixao
            WHERE id = $1
            RETURNING *;
        `;
  const result = await db.query(deleteQuery, [id]);
  return result.rows[0];
}

