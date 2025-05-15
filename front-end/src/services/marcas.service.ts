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

// Accept Partial<Marcas> so only required fields for creation are needed


export async function createMarcas(form: Partial<Marcas>): Promise<any> {
  const res = await fetch(API_URL + API_ROUTES.MARCAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export const buscarMarcasAxios = async (): Promise<Marcas[]> => {
    try {
        const response = await axios.get(`${API_URL}${API_ROUTES.MARCAS}`);
        return response.data as Marcas[];
    } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        throw error;
    }
};