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
import { criarTabelaAlocacao } from './tables/alocacao.js'




dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || undefined,
  host: process.env.DB_HOST || undefined,
  database: process.env.DB_DATABASE || undefined,
  password: process.env.DB_PASSWORD || undefined,
  port: process.env.DB_PORT 
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
  await criarTabelaAlocacao();
}