# Documentação Detalhada das Tarefas

Este documento detalha as alterações e implementações realizadas no sistema, abrangendo correções de segurança, melhorias em rotas de API e a criação de um novo fluxo de cadastro de usuários.

---

## 1. Correção de Segurança na Rota de Atualização (`PUT /usuarios/:id`)

- **Problema Identificado:** A rota `PUT /usuarios/:id`, responsável por atualizar os dados de um usuário, não possuía nenhuma verificação de autenticação. Isso permitia que qualquer pessoa, mesmo sem fazer login, pudesse alterar informações de usuários no sistema, representando uma falha de segurança crítica.

- **Solução Aplicada:** Foi adicionada à rota a função de verificação `validateToken`, que já era utilizada em outras rotas do sistema. Agora, apenas requisições com um token de autenticação válido no cabeçalho `Authorization` podem atualizar um usuário.

---

## 2. Melhoria na Rota de Listagem de Usuários (`GET /usuarios`)

- **Requisito:** A rota `GET /usuarios` deveria retornar não apenas o nome e o cargo, mas todos os dados do perfil do usuário, que estão armazenados em tabelas separadas (`defensores`, `servidores`, `estagiarios`).

- **Solução Aplicada:** A consulta SQL na função `obterTodosUsuarios` foi reestruturada.
    - Utilizando `LEFT JOIN`, a tabela `usuarios` foi conectada às tabelas `defensores`, `servidores` e `estagiarios`.
    - Com o comando `json_build_object` do PostgreSQL, foi criado um campo aninhado chamado `details` na resposta da API.
    - Este objeto `details` contém todos os campos (`id`, `nome`, `created_at`, `updated_at`) do perfil correspondente ao cargo do usuário, resultando em uma resposta JSON mais rica e organizada.

**Exemplo da Nova Resposta da API:**
```json
[
  {
    "id": 1,
    "cargo": "defensor",
    "created_at": "...",
    "updated_at": "...",
    "details": {
      "id": 101,
      "nome": "Nome do Defensor",
      "created_at": "...",
      "updated_at": "..."
    }
  }
]
```

---

## 3. Implementação do Fluxo de Cadastro de Usuário

O cadastro de usuário foi implementado em duas fases, sendo a segunda a versão final.

### Fase 1: Associar Pessoa Existente (Lógica Descontinuada)

Inicialmente, o formulário foi construído para associar uma pessoa já existente no banco de dados (um defensor, servidor ou estagiário) a uma nova conta de usuário. O formulário continha dois campos de seleção: um para o cargo e outro para o nome da pessoa.

### Fase 2: Criar Nova Pessoa e Usuário (Lógica Atual)

O requisito foi alterado para permitir a criação de um novo usuário digitando o nome manualmente.

#### **Alterações no Back-end:**

- **Nova Rota:** Foi criada a rota `POST /usuarios/novo`.
- **Lógica:**
    1. A rota recebe um `cargo` (ex: "servidor") e um `nome` (ex: "João da Silva").
    2. Com base no `cargo`, ela primeiro insere o `nome` na tabela correspondente (ex: `servidores`), criando um novo registro de pessoa.
    3. Em seguida, ela utiliza o `id` dessa pessoa recém-criada para inserir o registro na tabela `usuarios`, efetivando a criação do usuário no sistema.

#### **Alterações no Front-end (`cadastroUsuario.tsx`):**

- **Componente Simplificado:** A lógica para buscar as listas de nomes foi removida.
- **Formulário Atualizado:** O formulário agora contém:
    1. Um campo de seleção para o **Cargo**.
    2. Um campo de texto (`<input type="text">`) para digitar o **Nome** manualmente.
- **Chamada à API:** A função de submissão foi ajustada para enviar os dados (`cargo` e `nome`) para a nova rota `POST /usuarios/novo`.
- **Autenticação:** A lógica de autenticação foi corrigida para ler o token diretamente do `localStorage` e construir o cabeçalho `Authorization` para as chamadas `axios`.

---

## Resumo do Fluxo Final

O sistema agora permite a criação de novos usuários de forma centralizada e segura, com um fluxo de trabalho claro e uma API robusta para dar suporte às operações do front-end.