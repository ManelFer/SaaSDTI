import { API_ROUTES, API_URL } from '@/constants/constante';
import axios from 'axios';
import { EstoqueRetirada } from '@/models/estoqueRetirada.model';

export async function buscarRetiradas() : Promise<EstoqueRetirada[]> {
    const res = await fetch(API_URL + API_ROUTES. ESTOQUE_RETIRADA, {
        method: "GET",
        headers: { "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data;
}

export async function createRetirada(form: Partial<EstoqueRetirada>): Promise<EstoqueRetirada> {
    const res = await fetch(API_URL + API_ROUTES.ESTOQUE_RETIRADA, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}` },
        body: JSON.stringify(form),
    });
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await res.json();
    } else {
        const text = await res.text();
        console.error("Resposta não JSON:", text);
        throw new Error("Resposta não foi JSON.");
    }
}

export const retirarDoEstoque = async (data: EstoqueRetirada): Promise<EstoqueRetirada> => {
    try {
        const response = await axios.post(`${API_URL}/retirada-estoque`, data);
        return response.data as EstoqueRetirada;
    } catch (error) {
        console.error("Erro ao retirar do estoque:", error);
        throw error;
    }
};

