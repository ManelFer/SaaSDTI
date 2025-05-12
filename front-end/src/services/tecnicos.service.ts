import { API_URL, API_ROUTES } from "@/constants/constante";
import { Tecnico } from "@/models/tecnico.model";
import axios from 'axios';

export async function buscarTecnico(): Promise<Tecnico> {
    const res = await fetch(API_URL + API_ROUTES.TECNICOS, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
    
}

export const buscarTecnicos = async (): Promise<Tecnico[]> => {
  try {
    const response = await axios.get(`${API_URL}${API_ROUTES.TECNICOS}`);
    return response.data as Tecnico[];
  } catch (error) {
    console.error('Erro ao buscar técnicos:', error);
    throw error;
  }
};