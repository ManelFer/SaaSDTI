
import { API_URL, API_ROUTES } from "@/constants/constante";
import { getHeaders } from "@/lib/getHeaders";
import { Alocacao } from "@/models/alocacao.model";

export async function buscarAlocacoes(): Promise<Alocacao[]> {
  const res = await fetch(API_URL + API_ROUTES.ALOCACAO, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Erro ao buscar alocações: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export async function createAlocacao(form: Partial<Alocacao>): Promise<Alocacao> {
  const res = await fetch(API_URL + API_ROUTES.ALOCACAO, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    throw new Error(`Erro ao criar alocação: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}



export async function atualizarAlocacao(
  id: number,
  form: Partial<Alocacao>
): Promise<Alocacao> {
  const res = await fetch(`${API_URL}${API_ROUTES.ALOCACAO}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    throw new Error(`Erro ao atualizar alocacao: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}


//metodo deleta um alocacao
export async function deletarItemAlocacao(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/alocacao/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Erro ao deletar alocacao: ${errorText}`);  
        }
    } catch (error) {
        console.error('Erro ao deletar alocacao:', error);
        throw error;
    }
}

