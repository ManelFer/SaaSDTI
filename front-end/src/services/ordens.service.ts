import { API_URL, API_ROUTES } from "@/constants/constante";
import { Ordem } from "@/models/ordem.model";
import axios from 'axios';

/**
 * Função que busca as Ordens de Serviço no backend
 * @param {any} form - Formul rio com os dados para a busca
 * @returns {Promise<any>} - Resposta do backend com a lista de Ordens de Servi o
 */
export async function createOrdens(form: Ordem): Promise<any> {
    const res = await fetch(API_URL + API_ROUTES.ORDENS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export const buscarOrdensServicos = async (): Promise<Ordem[]> => {
    try {
      const response = await axios.get(`${API_URL}/os`);
      return response.data as Ordem[];
    } catch (error) {
      console.error('Erro ao buscar ordens de serviços:', error);
      throw error;
    }
  };

