import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Alocacao } from "@/models/alocacao.model";
import axios from 'axios';

    


export async function createAlocacao(form: Alocacao):Promise<Alocacao> {
    const res = await fetch(API_URL + API_ROUTES.ALOCACAO, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export async function buscarAlocacao(): Promise<Alocacao[]> {
    const res = await fetch(API_URL + API_ROUTES.ALOCACAO, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
}

export const buscarAlocacoes = async (): Promise<Alocacao[]> => {
  try {
    const response = await axios.get(`${API_URL}/alocacao`);
    return response.data as Alocacao[];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

//metodo deleta um alocacao
export async function deletarItemAlocacao(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/alocacao/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
    } catch (error) {
        console.error('Erro ao deletar alocacao:', error);
        throw error;
    }
}

// atualiza um alocacao
export async function atualizarAlocacao(id: number, form: Alocacao): Promise<Alocacao> {
    const res = await fetch(`${API_URL}${API_ROUTES.ALOCACAO}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    if (!res.ok) {
        throw new Error(`Erro ao atualizar alocacao: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}