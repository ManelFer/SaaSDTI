import { API_URL, API_ROUTES } from "@/constants/constante";
import { Tecnico, TecnicoCreate } from "@/models/tecnico.model";
import { getHeaders } from "@/lib/getHeaders";
import axios from 'axios';


type AtualizarTecnicoPayload = Partial<Tecnico> & {
  senhaAtual?: string;
}

export async function buscarTecnico(): Promise<Tecnico> {
    const res = await fetch(API_URL + API_ROUTES.TECNICOS, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
    
}

// METODO POST
export async function cadastrarTecnico(tecnico: TecnicoCreate): Promise<Tecnico> {
  const res = await fetch(API_URL + API_ROUTES.TECNICOS, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(tecnico),
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

export const buscarTecnicos = async (): Promise<Tecnico[]> => {
  try {
    const response = await axios.get(`${API_URL}${API_ROUTES.TECNICOS}`);
    const tecnicos = response.data || [];
    return tecnicos as Tecnico[];
  } catch (error) {
    console.error('Erro ao buscar técnicos:', error);
    throw error;
  }
};

export const buscarTecnicoPorId = async (id: number): Promise<Tecnico> => {
  try {
    const response = await axios.get(`${API_URL}${API_ROUTES.TECNICOS}/${id}`);
    const tecnico = response.data;
    return tecnico as Tecnico;
  } catch (error) {
    console.error(`Erro ao buscar técnico com ID ${id}:`, error);
    throw error;
  }
};

// update
export async function atualizarTecnico(id: number, tecnico: AtualizarTecnicoPayload): Promise<Tecnico> {
  const res = await fetch(`${API_URL}${API_ROUTES.TECNICOS}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(tecnico),
  });
  if (!res.ok){
    throw new Error(`Erro HTTP: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

//DELETE
export async function deletarTecnico(id:number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/tecnicos/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok){
      throw new Error(`Erro HTTP: ${res.status}`);
    }
  } catch (error) {
    console.error('Erro ao deletar tecnico:', error);
    throw error;
  }
}


