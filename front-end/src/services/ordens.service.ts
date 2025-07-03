import { API_URL, API_ROUTES } from "@/constants/constante";
import { Ordem } from "@/models/ordem.model";
import axios from 'axios';

/**
 * Função que cria uma nova Ordem de Serviço no backend
 * @param {Ordem} ordem - Dados da ordem de serviço a ser criada
 * @returns {Promise<any>} - Resposta do backend
 */
export async function createOrdens(ordem: Ordem): Promise<Ordem> {
    try {
        const res = await fetch(API_URL + API_ROUTES.ORDENS, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(ordem) // Adiciona os dados no corpo da requisição
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Erro ao criar ordem de serviço:', error);
        throw error;
    }
}

/**
 * Função que busca todas as Ordens de Serviço
 * @returns {Promise<Ordem[]>} - Lista de ordens de serviço
 */
export const buscarOrdensServicos = async (): Promise<Ordem[]> => {
    try {
        const response = await axios.get(`${API_URL}/os`);
        return response.data as Ordem[];
    } catch (error) {
        console.error('Erro ao buscar ordens de serviços:', error);
        throw error;
    }
};