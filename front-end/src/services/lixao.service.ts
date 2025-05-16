import { API_URL, API_ROUTES } from "@/constants/constante";
import { Lixao } from "@/models/lixao.model";
import axios from 'axios';

export async function createLixao(form: Lixao): Promise<any> {
    const res = await fetch(API_URL + API_ROUTES.LIXAO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export const buscarLixao = async (): Promise<Lixao[]> => {
    try {
        const response = await axios.get(`${API_URL}/lixao`);
        return response.data as Lixao[];
    } catch (error) {
        console.error('Erro ao buscar ordens de serviços:', error);
        throw error;
    }
};