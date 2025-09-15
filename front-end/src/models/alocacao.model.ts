export interface Alocacao {
  id: number;
  patrimonio: string;
  modelo: string;
  created_at: string;

  equipamento_id: number;
  marca_id: number;
  setor_id: number;

  equipamento_nome?: string;
  marca_nome?: string;
  setor_nome?: string;
}
