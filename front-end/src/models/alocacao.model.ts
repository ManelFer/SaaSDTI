export class Alocacao {
    id?: number | null | undefined
    equipamento_id: number | undefined
    marcas_id: number | undefined
    setor_id: number | undefined
    patrimonio: string | null | undefined
    equipamento?: { nome: string };
    marca?: { nome: string };
    setor?: { nome: string };
}