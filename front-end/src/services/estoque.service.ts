import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Estoque } from "@/models/estoque.model";
import axios from 'axios';


/**
 * Função que busca os Estoques no backend
 * @param {any} form - Formul rio com os dados para a busca
 * @returns {Promise<any>} - Resposta do backend com a lista de Estoques
 */
export async function createEstoque(form: Estoque): Promise<Estoque> {
    const res = await fetch(API_URL + API_ROUTES.ESTOQUE, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}
export async function buscarEstoque(): Promise<Estoque> {
    const res = await fetch(API_URL + API_ROUTES.ESTOQUE, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
}

export const buscarEstoques = async (): Promise<Estoque[]> => {
  try {
    const response = await axios.get(`${API_URL}/estoque`);
    return response.data as Estoque[];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};