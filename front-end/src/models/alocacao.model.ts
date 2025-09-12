export interface Alocacao {
  id: number;
  patrimonio: string;
  created_at: string;

  // Foreign Keys
  equipamento_id: number;
  marcas_id: number;
  setor_id: number;

  // Nomes das relações (para exibição)
  equipamento_nome?: string;
  marca_nome?: string;
  setor_nome?: string;
}
