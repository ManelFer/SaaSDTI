import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Ordem } from "@/models/ordem.model";
import axios from 'axios';

/**
 * Função que cria uma nova Ordem de Serviço no backend
 * @param {Ordem} ordem - Dados da ordem de serviço a ser criada
 * @returns {Promise<any>} 
 */
export async function createOrdens(payload: FormData | string, customHeaders?: Record<string, string>): Promise<Ordem> {
    try {
        const baseHeaders = getHeaders();
        const headers: Record<string, string > = { ...baseHeaders, ...customHeaders };

        if (payload instanceof FormData) {
            delete headers['Content-Type'];
        }

        const res = await fetch(API_URL + API_ROUTES.ORDENS, {
            method: "POST",
            headers: headers,
            body: payload
        });
        
        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(`Erro HTTP: ${res.status} - ${errorBody}`);
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
        const response = await axios.get(`${API_URL}/os` , {
            headers: getHeaders( )
        });
        return response.data as Ordem[];
    } catch (error) {
        console.error('Erro ao buscar ordens de serviços:', error);
        throw error;
    }
};

export async function updateOrdem(id: number, ordem: Ordem): Promise<Ordem> {
    try {
        const res = await fetch(`${API_URL}/os/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(ordem)
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Erro ao atualizar ordem de serviço:', error);
        throw error;
    }
}

//metodo deleta uma ordem de serviço
export async function deletarOrdemServico(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/os/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
    } catch (error) {
        console.error('Erro ao deletar ordem de serviço:', error);
        throw error;
    }
}