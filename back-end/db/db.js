import pkg from 'pg';
import dotenv from 'dotenv';
import {criarTabelaOrdensServico }from './tables/ordens_servico.js'
import { criarTabelaMarcas } from './tables/marcas.js';
import {criarTabelaSetores} from './tables/setores.js';
import { criarTabelaEstoque } from './tables/estoque.js';
import { criarTabelaTecnicos } from './tables/tecnicos.js';
import { criarTabelaLixao } from './tables/lixao.js';


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
  criarTabelaOrdensServico();
  criarTabelaSetores();
  criarTabelaEstoque();
  criarTabelaTecnicos();
  criarTabelaMarcas();
  criarTabelaLixao();
}