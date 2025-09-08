/**
 * Endereço da API.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.56.1:3001';

/**
 * Rotas do backend.
 */
export const API_ROUTES = {
  ORDENS: "/os",
  SETORES: "/setores",
  ESTOQUE: "/estoque",
  TECNICOS: "/tecnicos",
  MARCAS: "/marcas",
  LIXAO: "/lixao",
  ITENS: "/equipamentos",
  ESTOQUE_RETIRADA: "/estoque-retirada",
  ESTAGIARIO: "/estagiario",
  DEFENSOR: "/defensor",
  SERVIDOR: "/servidor",
  USUARIOS: "/usuarios",
  ALOCACAO: "/alocacao",
  }