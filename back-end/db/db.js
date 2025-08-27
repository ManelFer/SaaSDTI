import pkg from 'pg';
import dotenv from 'dotenv';
import {criarTabelaOrdensServico }from './tables/ordens_servico.js'
import { criarTabelaMarcas } from './tables/marcas.js';
import {criarTabelaSetores} from './tables/setores.js';
import { criarTabelaEstoque } from './tables/estoque.js';
import { criarTabelaTecnicos } from './tables/tecnicos.js';
import { criarTabelaLixao } from './tables/lixao.js';
import { criarTabelaEquipamentos } from './tables/equipamentos.js';
import { criarTabelaEstagiarios } from './tables/estagiario.js';
import { criarTabelaServidores } from './tables/servidor.js';
import { criarTabelaDefensores } from './tables/defensor.js';
import { criarTabelaRetiradaEstoque } from './tables/retirada_estoque.js';
import { criarTabelaUsuarios } from './tables/usuarios.js';

async function popularTabelas() {
    try {
        // Popula defensores e cria usuários
        const defensorResult = await pool.query("INSERT INTO defensores (nome) VALUES ('Carlos Drummond') ON CONFLICT DO NOTHING RETURNING id;");
        if (defensorResult.rows.length > 0) {
            await pool.query("INSERT INTO usuarios (cargo, defensor_id) VALUES ('defensor', $1) ON CONFLICT DO NOTHING;", [defensorResult.rows[0].id]);
        }

        // Popula servidores e cria usuários
        const servidorResult = await pool.query("INSERT INTO servidores (nome) VALUES ('Cecília Meireles') ON CONFLICT DO NOTHING RETURNING id;");
        if (servidorResult.rows.length > 0) {
            await pool.query("INSERT INTO usuarios (cargo, servidor_id) VALUES ('servidor', $1) ON CONFLICT DO NOTHING;", [servidorResult.rows[0].id]);
        }

        // Popula estagiarios e cria usuários
        const estagiarioResult = await pool.query("INSERT INTO estagiarios (nome) VALUES ('Clarice Lispector') ON CONFLICT DO NOTHING RETURNING id;");
        if (estagiarioResult.rows.length > 0) {
            await pool.query("INSERT INTO usuarios (cargo, estagiario_id) VALUES ('estagiario', $1) ON CONFLICT DO NOTHING;", [estagiarioResult.rows[0].id]);
        }
        console.log('Tabelas populadas com dados de teste.');
    } catch (error) {
        console.error('Erro ao popular tabelas:', error);
    }
}


dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'ordens_servico',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});

export default pool;


/**
 * Cria as tabelas do banco de dados. 
 * 
 * @returns {Promise<void>}
 */
export async function criarTabelas() {
  await criarTabelaSetores();
  await criarTabelaEstoque();
  await criarTabelaTecnicos();
  await criarTabelaMarcas();
  await criarTabelaLixao();
  await criarTabelaEquipamentos();
  await criarTabelaEstagiarios();
  await criarTabelaServidores();
  await criarTabelaDefensores();
  await criarTabelaRetiradaEstoque();
  await criarTabelaOrdensServico();
  await criarTabelaUsuarios();
  await popularTabelas();
}