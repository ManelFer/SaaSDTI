import { API_ROUTES, API_URL } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Usuarios } from "@/models/usuarios.model";
import axios from 'axios';


export async function createUsuarios(form: Usuarios):Promise<Usuarios> {
    const res = await fetch(API_URL + API_ROUTES.USUARIOS, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export async function buscarUsuarios(): Promise<Usuarios> {
    const res = await fetch(API_URL + API_ROUTES.USUARIOS, {
        method: "GET",
        headers: getHeaders(),
    });
    const data = await res.json();
    return data;
}

export const buscarUsuario = async (): Promise<Usuarios[]> => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data as Usuarios[];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

//metodo deleta um usuarios
export async function deletarItemUsuarios(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
    } catch (error) {
        console.error('Erro ao deletar usuarios:', error);
        throw error;
    }
}

// atualiza um usuarios
export async function atualizarUsuarios(id: number, form: Usuarios): Promise<Usuarios> {
    const res = await fetch(`${API_URL}${API_ROUTES.USUARIOS}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(form),
    });
    if (!res.ok) {
        throw new Error(`Erro ao atualizar usuarios: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}