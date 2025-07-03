# Documentação Completa do Projeto SaaS DTI

## 1. Visão Geral do Projeto

O projeto SaaS DTI é um sistema completo de gerenciamento de operações de suporte técnico, projetado para otimizar o fluxo de trabalho do setor de TI. Ele é composto por um back-end robusto que fornece APIs RESTful e um front-end moderno e responsivo para interação do usuário.

A aplicação permite o gerenciamento de ordens de serviço, controle de estoque de equipamentos, administração de setores, técnicos e marcas, além de um sistema para descarte e registro de itens danificados (Lixão).

---

## 2. Arquitetura e Tecnologias

O sistema é construído sobre uma arquitetura cliente-servidor desacoplada, o que permite desenvolvimento e escalabilidade independentes para o front-end e o back-end.

### **Front-End**

A aplicação do lado do cliente é uma Single Page Application (SPA) construída com as tecnologias mais modernas para garantir uma experiência de usuário rápida e interativa.

- **Framework**: [Next.js 14](https://nextjs.org/docs)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/docs/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/docs)
- **Autenticação**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Componentes UI**: [Shadcn UI](https://ui.shadcn.com/), Radix UI, Headless UI
- **Gerenciamento de Estado**: React Hooks e Context API
- **Comunicação com API**: Axios e Fetch API

### **Back-End**

O serviço do back-end é responsável pela lógica de negócios, acesso ao banco de dados e por servir os dados para o front-end através de uma API RESTful.

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Linguagem**: JavaScript (ESM)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/docs/)
- **ORM/Driver**: [Node-Postgres (pg)](https://node-postgres.com/)

---

## 3. Estrutura do Projeto

O projeto é organizado em duas pastas principais: `front-end` e `back-end`.

```
SaaSDTI/
├── back-end/
│   ├── db/
│   │   ├── comandos/     # Scripts SQL para popular o banco
│   │   ├── tables/       # Definições das tabelas do banco
│   │   └── db.js         # Configuração da conexão com o banco
│   ├── routes/           # Definições das rotas da API
│   ├── server.js         # Ponto de entrada principal do servidor
│   ├── .env              # Arquivo de variáveis de ambiente
│   └── package.json      # Dependências do back-end
│
└── front-end/
    ├── src/
    │   ├── app/          # Rotas, páginas e layouts (App Router)
    │   ├── components/   # Componentes React reutilizáveis
    │   ├── constants/    # Constantes da aplicação (ex: rotas da API)
    │   ├── hooks/        # Hooks React customizados
    │   ├── lib/          # Funções utilitárias e configuração de libs (Firebase)
    │   ├── models/       # Interfaces e tipos TypeScript para os dados
    │   └── services/     # Funções para comunicação com a API
    ├── public/           # Arquivos estáticos
    ├── next.config.ts    # Configuração do Next.js
    └── package.json      # Dependências do front-end
```

---

## 4. Guia de Instalação e Execução

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento completo.

### **Pré-requisitos**

- **Node.js**: v18.x ou superior
- **PostgreSQL**: v12 ou superior
- **npm** ou **yarn**

### **4.1. Configuração do Back-End**

1.  **Navegue até a pasta do back-end:**
    ```bash
    cd back-end
    ```

2.  **Crie o arquivo de ambiente `.env`** na raiz da pasta `back-end` e preencha com as credenciais do seu banco de dados PostgreSQL:
    ```env
    DB_USER=seu_usuario_db
    DB_PASSWORD=sua_senha_db
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=seu_banco_de_dados
    PORT=3001
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor do back-end:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3001`.

### **4.2. Configuração do Front-End**

1.  **Abra um novo terminal e navegue até a pasta do front-end:**
    ```bash
    cd front-end
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento do front-end:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

---

## 5. Endpoints da API (Back-End)

O back-end expõe os seguintes endpoints para gerenciamento dos recursos:

#### **Ordens de Serviço (`/ordens`, `/os`)**
- `GET /os`: Lista todas as ordens de serviço.
- `POST /ordens`: Cria uma nova ordem de serviço.

#### **Setores (`/setores`)**
- `GET /setores`: Lista todos os setores.

#### **Estoque (`/estoque`)**
- `GET /estoque`: Lista todos os itens em estoque.
- `POST /estoque`: Adiciona um novo item ao estoque.

#### **Retirada de Estoque (`/retirada-estoque`)**
- `POST /retirada-estoque`: Realiza a retirada de um item do estoque e o move para a tabela de retiradas.
- `GET /retirada-estoque`: Lista todos os itens retirados.

#### **Técnicos (`/tecnicos`)**
- `GET /tecnicos`: Lista todos os técnicos.

#### **Marcas (`/marcas`)**
- `GET /marcas`: Lista todas as marcas.
- `POST /marcas`: Adiciona uma nova marca.
- `GET /marcas/:id`: Obtém uma marca por ID.

#### **Equipamentos (`/equipamentos`)**
- `GET /equipamentos`: Lista todos os tipos de equipamentos.
- `POST /equipamentos`: Adiciona um novo tipo de equipamento.
- `GET /equipamentos/:id`: Obtém um equipamento por ID.

#### **Lixão (`/lixao`)**
- `GET /lixao`: Lista todos os itens no lixão.
- `POST /lixao`: Adiciona um item ao lixão.
- `PUT /lixao/:id`: Atualiza um item no lixão.
- `DELETE /lixao/:id`: Remove um item do lixão.

---

## 6. Banco de Dados

O sistema utiliza PostgreSQL como banco de dados. As tabelas são criadas automaticamente quando o servidor back-end é iniciado.

- **Tabelas Principais**:
  - `ordens_servico`: Armazena as ordens de serviço.
  - `estoque`: Gerencia os itens disponíveis.
  - `retirada_estoque`: Registra os itens retirados do estoque.
  - `lixao`: Registra itens danificados ou para descarte.
  - `setores`: Lista de setores da defensoria.
  - `tecnicos`: Lista de técnicos responsáveis.
  - `marcas`: Marcas dos equipamentos.
  - `equipamentos`: Tipos de equipamentos (ex: Notebook, Monitor).
  - `servidores`, `defensores`, `estagiarios`: Tabelas para gerenciamento de pessoal.

- **Scripts de Inserção**:
  - A pasta `back-end/db/comandos/` contém scripts SQL para popular as tabelas com dados iniciais (setores, equipamentos, etc.), facilitando a configuração inicial do ambiente.

---

## 7. Diretrizes de Desenvolvimento

- **Estilo de Código**: Siga as convenções padrão para JavaScript/TypeScript e React/Node.js.
- **Commits**: Escreva mensagens de commit claras e significativas.
- **Error Handling**: A API utiliza códigos de status HTTP padrão. O front-end deve tratar as respostas de erro adequadamente, exibindo mensagens amigáveis ao usuário.
- **Segurança**: As credenciais e chaves de API são gerenciadas por meio de variáveis de ambiente (`.env`). As queries ao banco de dados são parametrizadas para prevenir SQL Injection.

