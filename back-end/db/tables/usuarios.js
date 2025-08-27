import db from "../db.js";

/**
 * Cria a tabela 'usuarios' se ela não existir.
 * Esta tabela age como um ponto central para todos os tipos de usuários (defensores, servidores, estagiários),
 * associando um registro de usuário a um registro específico de cargo através de chaves estrangeiras.
 *
 * A integridade é garantida por:
 * - Uma restrição CHECK que permite apenas um tipo de 'cargo_id' por vez.
 * - Restrições UNIQUE para garantir que cada defensor, servidor ou estagiário só possa ser um usuário.
 * - 'ON DELETE CASCADE' para remover o usuário correspondente se o registro do cargo for deletado.
 */
export async function criarTabelaUsuarios() {
    await db.query('DROP TABLE IF EXISTS usuarios CASCADE;');
    const query = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        cargo VARCHAR(100) NOT NULL CHECK (cargo IN ('estagiario', 'defensor', 'servidor')),
        
        -- Chaves estrangeiras para as tabelas de cargos
        defensor_id INTEGER REFERENCES defensores(id) ON DELETE CASCADE,
        servidor_id INTEGER REFERENCES servidores(id) ON DELETE CASCADE,
        estagiario_id INTEGER REFERENCES estagiarios(id) ON DELETE CASCADE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        -- Garante que cada usuário tenha apenas um cargo preenchido
        CONSTRAINT chk_cargo_id CHECK (
            (cargo = 'defensor' AND defensor_id IS NOT NULL AND servidor_id IS NULL AND estagiario_id IS NULL) OR
            (cargo = 'servidor' AND defensor_id IS NULL AND servidor_id IS NOT NULL AND estagiario_id IS NULL) OR
            (cargo = 'estagiario' AND defensor_id IS NULL AND servidor_id IS NULL AND estagiario_id IS NOT NULL)
        ),

        -- Garante que cada pessoa (defensor, servidor, estagiário) seja associada a no máximo um usuário
        UNIQUE (defensor_id),
        UNIQUE (servidor_id),
        UNIQUE (estagiario_id)
    );
    `;
    return db.query(query);
}

/**
 * Adiciona um novo usuário, associando-o a um registro existente de defensor, servidor ou estagiário.
 *
 * Exemplo de uso:
 * // Para adicionar um defensor com id 5 como usuário
 * await adicionarUsuario('defensor', 5);
 *
 * @param {string} cargo - O cargo do usuário ('defensor', 'servidor', 'estagiario').
 * @param {number} cargoId - O ID do registro na tabela correspondente ao cargo (e.g., o id de um defensor em 'defensores').
 * @returns {Promise<object>} O objeto do usuário criado.
 */
export async function adicionarUsuario(cargo, cargoId) {
    let column;
    switch (cargo) {
        case 'defensor':
            column = 'defensor_id';
            break;
        case 'servidor':
            column = 'servidor_id';
            break;
        case 'estagiario':
            column = 'estagiario_id';
            break;
        default:
            throw new Error('Cargo inválido. Use "defensor", "servidor" ou "estagiario".');
    }

    const query = `
        INSERT INTO usuarios (cargo, ${column})
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [cargo, cargoId];
    const result = await db.query(query, values);
    return result.rows[0];
}

/**
 * Obtém todos os usuários com seus nomes e cargos.
 * Realiza um JOIN com as tabelas de cargos para buscar o nome correspondente.
 * @returns {Promise<Array<object>>} Uma lista de objetos, cada um representando um usuário com id, cargo, nome, etc.
 */
export async function obterTodosUsuarios() {
    const query = `
        SELECT
            u.id,
            u.cargo,
            u.created_at,
            u.updated_at,
            CASE
                WHEN u.cargo = 'defensor' THEN json_build_object('id', d.id, 'nome', d.nome, 'created_at', d.created_at, 'updated_at', d.updated_at)
                WHEN u.cargo = 'servidor' THEN json_build_object('id', s.id, 'nome', s.nome, 'created_at', s.created_at, 'updated_at', s.updated_at)
                WHEN u.cargo = 'estagiario' THEN json_build_object('id', e.id, 'nome', e.nome, 'created_at', e.created_at, 'updated_at', e.updated_at)
            END AS details
        FROM
            usuarios u
        LEFT JOIN defensores d ON u.defensor_id = d.id
        LEFT JOIN servidores s ON u.servidor_id = s.id
        LEFT JOIN estagiarios e ON u.estagiario_id = e.id
        ORDER BY CASE
            WHEN u.cargo = 'defensor' THEN d.nome
            WHEN u.cargo = 'servidor' THEN s.nome
            WHEN u.cargo = 'estagiario' THEN e.nome
        END;
    `;
    const result = await db.query(query);
    return result.rows;
}

/**
 * Remove um usuário da tabela 'usuarios' pelo seu ID.
 * @param {number} id - O ID do usuário a ser removido.
 * @returns {Promise<object>} O registro do usuário que foi removido.
 */
export async function removerUsuario(id) {
    const query = `
        DELETE FROM usuarios
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
}

export async function atualizarUsuario(id, {cargo, nome}){
    const query = `
        UPDATE usuarios
        SET cargo = $1, nome = $2
        WHERE id = $3
        RETURNING *;
    `;
    const values = [cargo, nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
}
