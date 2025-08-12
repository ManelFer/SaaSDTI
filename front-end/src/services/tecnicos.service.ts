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
export const atualizarTecnico = async (id: number, data: Partial<Tecnico>): Promise<Tecnico> => {
  try {
    const response = await axios.put(`${API_URL}${API_ROUTES.TECNICOS}/${id}`, data);
    const tecnico = response.data;
    return tecnico as Tecnico;
  } catch (error) {
    console.error(`Erro ao atualizar técnico com ID ${id}:`, error);
    throw error;
  }
};
