/**
 * Endereço da API.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Rotas do backend.
 */
export const API_ROUTES = {
  ORDENS: "/ordens",
  SETORES: "/setores",
  ESTOQUE: "/estoque",
  TECNICOS: "/tecnicos",
  MARCAS: "/marcas",
  LIXAO: "/lixao",
  }