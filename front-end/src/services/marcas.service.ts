import { API_ROUTES, API_URL } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Marcas } from "@/models/marcas.model";


export async function buscarMarcas(): Promise<Marcas[]> {
    const res = await fetch(API_URL + API_ROUTES.MARCAS, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
}

export async function createMarcas(form: Partial<Marcas>): Promise<Marcas> {
  const res = await fetch(API_URL + API_ROUTES.MARCAS, {
    method: "POST",
    headers: getHeaders(),
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

// metodo deleta uma marca
export async function deleteMarcas(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/marcas/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
  } catch (error) {
    console.error('Erro ao deletar marca:', error);
    throw error;
  }
}
