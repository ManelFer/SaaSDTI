import axios from 'axios';
import { EstoqueRetirada } from '@/models/estoqueRetirada.model';

const API_URL = 'http://localhost:3001';

export const retirarDoEstoque = async (data: EstoqueRetirada): Promise<EstoqueRetirada> => {
    try {
        const response = await axios.post(`${API_URL}/retirada-estoque`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao retirar do estoque:", error);
        throw error;
    }
};
