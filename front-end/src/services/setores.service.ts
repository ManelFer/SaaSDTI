import { API_URL, API_ROUTES } from "@/constants/constante";
import { Setor } from "@/models/setor.model";
import axios from 'axios';

// Interface para o objeto retornado pela API
interface ApiSetor {
    id: number;
    name: string;
    descricao: string;
    created_at: Date;
    updated_at: Date;
}

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
    const apiSetor: ApiSetor = await res.json();
    // Map the API response to the Setor model
    const data: Setor = {
        id: apiSetor.id,
        nome: apiSetor.name, // Maps name to nome
        descricao: apiSetor.descricao,
        created_at: apiSetor.created_at,
        updated_at: apiSetor.updated_at
    };
    return data;
}


export const buscarSetores = async (): Promise<Setor[]> => {
  try {
    const response = await axios.get(`${API_URL}${API_ROUTES.SETORES}`);
    const setoresArray = response.data as ApiSetor[];
    const data = setoresArray.map((apiSetor: ApiSetor) => ({
        id: apiSetor.id,
        nome: apiSetor.name, // Correctly maps name to nome
        descricao: apiSetor.descricao,
        created_at: apiSetor.created_at,
        updated_at: apiSetor.updated_at
    }));
    return data;
  } catch (error) {
    console.error('Erro ao buscar setores:', error);
    throw error;
  }
};
