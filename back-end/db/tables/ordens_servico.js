import db from "../db.js";

// CREATE TABLE
export function criarTabelaOrdensServico() {
  const query = `
    CREATE TABLE IF NOT EXISTS public.ordens_servico
    (
        id SERIAL PRIMARY KEY,
        numero_os VARCHAR(20) NOT NULL UNIQUE,
        data_abertura TIMESTAMP NOT NULL,
        solicitante VARCHAR(100) NOT NULL,
        setor_id INTEGER NOT NULL,
        patrimonio VARCHAR(100) NOT NULL,
        tipo_falha TEXT,
        solucao_tecnica TEXT,
        tecnico_responsavel_id VARCHAR(100),
        arquivo BYTEA,
        data_recolhimento TIMESTAMP,
        data_devolucao TIMESTAMP,
        data_fechamento TIMESTAMP,
        status VARCHAR(20) DEFAULT 'Não resolvido',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT ordens_servico_status_check CHECK (
          status IN ('Resolvido', 'Não resolvido', 'Em andamento')
        ),
        CONSTRAINT fk_setor FOREIGN KEY (setor_id)
            REFERENCES setores(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
    )
  `;
  return db.query(query);
}

// CREATE
export async function inserirOrdemServico(values) {
  const insertQuery = `
    INSERT INTO ordens_servico (
      numero_os, data_abertura, solicitante, setor_id, patrimonio,
      tipo_falha, solucao_tecnica, tecnico_responsavel_id,
      data_recolhimento, data_devolucao, data_fechamento, status, arquivo
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *;
  `;
  const result = await db.query(insertQuery, values);
  const inserted = result.rows[0];

  const joinQuery = `
    SELECT os.*, s.nome AS setor_nome
    FROM ordens_servico os
    JOIN setores s ON s.id = os.setor_id
    WHERE os.id = $1
  `;
  return db.query(joinQuery, [inserted.id]);
}

// READ ALL
export async function listarOrdensServico() {
  const query = `
    SELECT os.*, s.nome AS setor_nome
    FROM ordens_servico os
    JOIN setores s ON s.id = os.setor_id
    ORDER BY os.id DESC
  `;
  return db.query(query);
}

// READ BY ID
export async function buscarOrdemPorId(id) {
  const query = `
    SELECT os.*, s.nome AS setor_nome
    FROM ordens_servico os
    JOIN setores s ON s.id = os.setor_id
    WHERE os.id = $1
  `;
  return db.query(query, [id]);
}

// UPDATE
export async function atualizarOrdemServico(id, data) {
  const query = `
    UPDATE ordens_servico
    SET
      numero_os = $1,
      data_abertura = $2,
      solicitante = $3,
      setor_id = $4,
      patrimonio = $5,
      tipo_falha = $6,
      solucao_tecnica = $7,
      tecnico_responsavel_id = $8,
      data_recolhimento = $9,
      data_devolucao = $10,
      data_fechamento = $11,
      status = $12,
      arquivo = $13,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $14
    RETURNING *;
  `;
  const values = [
    data.numero_os,
    data.data_abertura,
    data.solicitante,
    data.setor_id,
    data.patrimonio,
    data.tipo_falha,
    data.solucao_tecnica,
    data.tecnico_responsavel_id,
    data.data_recolhimento,
    data.data_devolucao,
    data.data_fechamento,
    data.status,
    data.arquivo,
    id
  ];
  const result = await db.query(query, values);
  const updated = result.rows[0];

  const joinQuery = `
    SELECT os.*, s.nome AS setor_nome
    FROM ordens_servico os
    JOIN setores s ON s.id = os.setor_id
    WHERE os.id = $1
  `;
  return db.query(joinQuery, [updated.id]);
}

// DELETE
export async function deletarOrdemServico(id) {
  const query = `DELETE FROM ordens_servico WHERE id = $1 RETURNING *`;
  return db.query(query, [id]);
}
