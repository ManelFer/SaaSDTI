export class Ordem {
    numero_os: string | undefined
    data_abertura: string | undefined
    solicitante: string | undefined
    setor_id: number | undefined
    patrimonio: string | undefined
    tipo_falha: string | undefined
    solucao_tecnica: string | undefined
    tecnico_responsavel_id: number | undefined
    data_recolhimento: string | null | undefined
    data_devolucao: string | null | undefined
    data_fechamento: string | undefined
    status: string | undefined
    arquivo: Buffer | null | undefined
    id?: number | null | undefined
}