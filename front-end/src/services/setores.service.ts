import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Setor } from "@/models/setor.model";

// Interface para o objeto retornado pela API
export async function buscarSetores(): Promise<Setor[]> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado no localStorage");
    }

    const res = await fetch(API_URL + API_ROUTES.SETORES, {
      method: "GET",
      headers: getHeaders()
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar setores:", error);
    throw error;
  }
}

export async function createSetor(form: Setor): Promise<Setor> {
  const res = await fetch(API_URL + API_ROUTES.SETORES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  return data;
}