import { API_URL, API_ROUTES } from "@/constants/constante";
import { EstoqueRetirada } from "@/models/estoqueRetirada.model";
//import axios from 'axios';

export async function createEstoqueRetirada(form: EstoqueRetirada): Promise<any> {
    const res = await fetch(API_URL + API_ROUTES.ESTOQUE_RETIRADA, {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
}

export async function buscarEstoqueRetirada(): Promise<EstoqueRetirada>{
    const res = await fetch(API_URL + API_ROUTES.ESTOQUE_RETIRADA, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    const data = await res.json();
    return data;
}