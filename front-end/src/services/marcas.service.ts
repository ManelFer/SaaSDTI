import { API_ROUTES, API_URL } from "@/constants/constante";
import { Marcas } from "@/models/marcas.model";
import axios from "axios";

export async function buscarMarcas(): Promise<Marcas[]> {
    const res = await fetch(API_URL + API_ROUTES.MARCAS, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
}

export const buscarMarcasAxios = async (): Promise<Marcas[]> => {
    try {
        const response = await axios.get(`${API_URL}${API_ROUTES.MARCAS}`);
        return response.data as Marcas[];
    } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        throw error;
    }
};