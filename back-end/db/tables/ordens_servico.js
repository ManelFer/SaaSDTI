import db from "../db.js";

export function criarTabelaOrdensServico() {
  const query = `
        CREATE TABLE IF NOT EXISTS public.ordens_servico
(
    id integer NOT NULL DEFAULT nextval('ordens_servico_id_seq'::regclass),
    numero_os character varying(20) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    data_abertura timestamp without time zone NOT NULL,
    solicitante character varying(100) COLLATE pg_catalog."default" NOT NULL,
    setor character varying(100) COLLATE pg_catalog."default" NOT NULL,
    patrimonio character varying(100) COLLATE pg_catalog."default",
    tipo_falha text COLLATE pg_catalog."default",
    solucao_tecnica text COLLATE pg_catalog."default",
    tecnico_responsavel character varying(100) COLLATE pg_catalog."default",
    data_recolhimento timestamp without time zone,
    data_devolucao timestamp without time zone,
    data_fechamento timestamp without time zone,
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'Não resolvido'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ordens_servico_pkey PRIMARY KEY (id),
    CONSTRAINT ordens_servico_numero_os_key UNIQUE (numero_os),
    CONSTRAINT ordens_servico_status_check CHECK (status::text = ANY (ARRAY['Resolvido'::character varying, 'Não resolvido'::character varying]::text[]))
)
    `;
  return db.query(query);
}
export function inserirOrdemServico(values) {
  const query = `
    INSERT INTO ordens_servico (
      numero_os, data_abertura, solicitante, setor, patrimonio,
      tipo_falha, solucao_tecnica, tecnico_responsavel,
      data_recolhimento, data_devolucao, data_fechamento, status
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *;
  `;
  return db.query(query, values);
}
