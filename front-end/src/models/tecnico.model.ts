export class Tecnico {
    id: number | undefined
    nome: string | undefined
    email: string | undefined
    senha: string | undefined
    role: string | undefined
    created_at: Date | undefined
    updated_at: Date | undefined
}

export type TecnicoCreate = Omit<Tecnico, "id" | "created_at" | "updated_at">;