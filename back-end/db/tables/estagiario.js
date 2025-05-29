// tabelas de estagiarios
import db from "../db.js";

// tabela de estagiarios
export function criarTabelaEstagiarios() {
  const query = `
    CREATE TABLE IF NOT EXISTS estagiarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );    
    `;
    return db.query(query);
}

// função para inserir um estagiario
export function inserirEstagiario(nome) {
  const query = `
    INSERT INTO estagiarios (nome)
    VALUES ($1)
    RETURNING *;
  `;
  return db.query(query, [nome])
    .then(res => res.rows[0])
    .catch(err => {
      console.error("Erro ao inserir estagiário:", err);
      throw err;
    });
}

// função para obter todos os estagiarios
export function obterEstagiarios() {
  const query = `
    SELECT * FROM estagiarios
    ORDER BY nome;
  `;
  return db.query(query)
    .then(res => res.rows)
    .catch(err => {
      console.error("Erro ao obter estagiários:", err);
      throw err;
    });
}

// função para excluir um estagiario
export function excluirEstagiario(id) {
  const query = `
    DELETE FROM estagiarios
    WHERE id = $1
    RETURNING *;
  `;
  return db.query(query, [id])
    .then(res => res.rows[0])
    .catch(err => {
      console.error("Erro ao excluir estagiário:", err);
      throw err;
    });
}

// função para atualizar um estagiario
export function atualizarEstagiario(id, nome) {
  const query = `
    UPDATE estagiarios
    SET nome = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;
  return db.query(query, [nome, id])
    .then(res => res.rows[0])
    .catch(err => {
      console.error("Erro ao atualizar estagiário:", err);
      throw err;
    });
}
