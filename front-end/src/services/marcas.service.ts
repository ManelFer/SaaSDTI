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

// Accept Partial<Marcas> so only required fields for creation are needed


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
