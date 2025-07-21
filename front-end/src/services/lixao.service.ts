import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Lixao } from "@/models/lixao.model";
import axios from 'axios';

export async function createLixao(form: Lixao): Promise<Lixao> {
    const res = await fetch(API_URL + API_ROUTES.LIXAO, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export const buscarLixao = async (): Promise<Lixao[]> => {
    try {
        const response = await axios.get(`${API_URL}/lixao`, {
            headers: getHeaders()
        });
        return response.data as Lixao[];
    } catch (error) {
        console.error('Erro ao buscar ordens de serviços:', error);
        throw error;
    }
};

export async function deletarLixao(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}${API_ROUTES.LIXAO}/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        if (!res.ok) {
            throw new Error(`Erro ao deletar item do lixão: ${res.statusText}`);
        }
    } catch (error) {
        console.error("Erro ao deletar item do lixão:", error);
        throw error;
    }
}

export async function atualizarLixao(id: number, form: Lixao): Promise<Lixao> {
    const res = await fetch(`${API_URL}${API_ROUTES.LIXAO}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    if (!res.ok) {
        throw new Error(`Erro ao atualizar item do lixão: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
