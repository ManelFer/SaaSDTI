import { API_ROUTES, API_URL } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Itens } from "@/models/itens.model";
import axios from "axios";

export async function buscarItens(): Promise<Itens[]> {
    const res = await fetch(API_URL + API_ROUTES.ITENS, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
}

// busca equipamento por id
export async function buscarItem(id: number): Promise<Itens> {
    const res = await fetch(API_URL + API_ROUTES.ITENS + `/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data;
}

export async function createItens(form: Partial<Itens>): Promise<Itens> {
    const res = await fetch(API_URL + API_ROUTES.ITENS, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                  },
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

export const buscarItensAxios = async (): Promise<Itens[]> => {
    try {
        const response = await axios.get(`${API_URL}${API_ROUTES.ITENS}`);
        return response.data as Itens[];
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        throw error;
    }
};
