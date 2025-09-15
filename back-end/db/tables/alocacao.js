import db from '../db.js';

// Função para criar a tabela de alocação
export function criarTabelaAlocacao() {
    const query = `
        CREATE TABLE IF NOT EXISTS alocacao (
            id SERIAL PRIMARY KEY,
            equipamento_id INTEGER REFERENCES equipamentos(id) ON DELETE SET NULL,
            marca_id INTEGER REFERENCES marcas(id) ON DELETE SET NULL,
            setor_id INTEGER REFERENCES setores(id) ON DELETE SET NULL,
            patrimonio VARCHAR(255) UNIQUE NOT NULL,
            modelo VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return db.query(query);
}

// CREATE - Adicionar uma nova alocação
export async function adicionarAlocacao({ equipamento_id, marca_id, setor_id, patrimonio, modelo }) {
    const query = `
        INSERT INTO alocacao (equipamento_id, marca_id, setor_id, patrimonio, modelo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [equipamento_id, marca_id, setor_id, patrimonio, modelo];
    const result = await db.query(query, values);
    return result.rows[0];
}

// READ - Obter todas as alocações com nomes
export async function obterTodasAlocacoes() {
    const query = `
        SELECT 
            a.id,
            a.patrimonio,
            a.modelo,
            e.nome AS equipamento_nome,
            m.nome AS marca_nome,
            s.nome AS setor_nome,
            a.created_at,
            a.updated_at
        FROM alocacao a
        LEFT JOIN equipamentos e ON a.equipamento_id = e.id
        LEFT JOIN marcas m ON a.marca_id = m.id
        LEFT JOIN setores s ON a.setor_id = s.id
        ORDER BY a.id DESC;
    `;
    const result = await db.query(query);
    return result.rows;
}

// READ - Obter uma alocação por ID com nomes
export async function obterAlocacaoPorId(id) {
    const query = `
        SELECT 
            a.id,
            a.patrimonio,
            a.modelo,
            e.nome AS equipamento_nome,
            m.nome AS marca_nome,
            s.nome AS setor_nome,
            a.created_at,
            a.updated_at
        FROM alocacao a
        LEFT JOIN equipamentos e ON a.equipamento_id = e.id
        LEFT JOIN marcas m ON a.marca_id = m.id
        LEFT JOIN setores s ON a.setor_id = s.id
        WHERE a.id = $1;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// UPDATE - Atualizar uma alocação
export async function atualizarAlocacao(id, { equipamento_id, marca_id, setor_id, patrimonio, modelo }) {
    const query = `
        UPDATE alocacao
        SET 
            equipamento_id = $1,
            marca_id = $2,
            setor_id = $3,
            patrimonio = $4,
            modelo = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *;
    `;
    const values = [equipamento_id, marca_id, setor_id, patrimonio, modelo, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// DELETE - Remover uma alocação
export async function removerAlocacao(id) {
    const query = `
        DELETE FROM alocacao
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}