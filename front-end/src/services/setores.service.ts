import { API_URL, API_ROUTES } from "@/constants/constante";
import { Setor } from "@/models/setor.model";
import axios from 'axios';

/**
 * Função que busca as Ordens de Serviço no backend
 * @param {any} form - Formul rio com os dados para a busca
 * @returns {Promise<any>} - Resposta do backend com a lista de Ordens de Servi o
 */
export async function buscarSetor(): Promise<Setor> {
    const res = await fetch(API_URL + API_ROUTES.SETORES, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
}


export const buscarSetores = async (): Promise<Setor[]> => {
  try {
    const response = await axios.get(`${API_URL}${API_ROUTES.SETORES}`);
    return response.data as Setor[];
  } catch (error) {
    console.error('Erro ao buscar setores:', error);
    throw error;
  }
};