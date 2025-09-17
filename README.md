# 📚 Sistema de Gestão de Equipamentos e Ordens de Serviço

## 1. Introdução
Este projeto foi desenvolvido com o objetivo de informatizar o processo de **gestão de equipamentos, estoque, ordens de serviço e descarte** em um setor de informática.  
Anteriormente, todos os registros eram feitos de forma manual (em cadernos e planilhas), o que dificultava a rastreabilidade e aumentava as chances de falhas.  

Assim, o sistema foi projetado para oferecer **maior controle, organização e eficiência** no gerenciamento de equipamentos e processos relacionados.

---

## 2. Objetivos do Sistema
- **Automatizar o controle de estoque** de equipamentos de informática.  
- **Gerenciar ordens de serviço**, desde a abertura até a resolução.  
- **Registrar movimentações de equipamentos** (alocação e retirada).  
- **Controlar descarte (lixão)** para rastreabilidade de equipamentos desativados.  
- **Oferecer autenticação segura** para proteção dos dados.  

---

## 3. Tecnologias Utilizadas

### 3.1 Back-end
- **Node.js + Express** → API RESTful  
- **PostgreSQL** → Banco de dados relacional  
- **Autenticação JWT** → Controle de acesso seguro  
- **Organização Modular** → Rotas e middlewares separados  

### 3.2 Front-end
- **Next.js (React + TypeScript)** → Interface do usuário  
- **TailwindCSS + shadcn/ui** → Estilização e componentes prontos  
- **Context API** → Gerenciamento de autenticação e estados globais  
- **Axios** → Consumo da API back-end  

---

## 4. Arquitetura do Sistema

O projeto é dividido em duas camadas principais:

```

back-end/        → API em Node.js
├── db/         → Scripts SQL e tabelas
├── routes/     → Rotas (alocação, estoque, ordens, usuários, etc.)
├── services/   → Middleware de autenticação
└── server.js   → Inicialização do servidor

front-end/       → Interface em Next.js
├── src/app/    → Páginas e módulos principais
├── src/models/ → Modelos TypeScript (tipagem)
├── src/services/ → Consumo da API
├── src/components/ → Componentes de interface
└── public/     → Logos e ícones

````

---

## 5. Funcionalidades do Sistema

- **Gestão de Estoque**: cadastro, atualização e retirada de equipamentos.  
- **Alocação de Itens**: movimentação de equipamentos entre setores e usuários.  
- **Ordens de Serviço (OS)**: abertura, atualização e finalização de OS.  
- **Gestão de Técnicos, Setores e Usuários**.  
- **Controle de Descarte (Lixão)**: rastreabilidade de equipamentos desativados.  
- **Perfil do Usuário**: edição de dados e alteração de senha.  
- **Autenticação JWT**: login seguro e controle de permissões.  

---

## 6. Instruções de Instalação e Uso

### 6.1 Pré-requisitos
- **Node.js** versão 18 ou superior  
- **PostgreSQL** instalado e configurado  
- **Git** para versionamento  

### 6.2 Configuração do Back-end
```bash
cd back-end
npm install
cp .env.example .env   # editar com credenciais do banco e JWT_SECRET
npm start
````

O servidor será iniciado em:
👉 `http://localhost:5000`

### 6.3 Configuração do Front-end

```bash
cd front-end
npm install
npm run dev
```

A aplicação será disponibilizada em:
👉 `http://localhost:3000`

---

## 7. Banco de Dados

* Scripts SQL para criação de tabelas e inserção de dados estão localizados em:
  `back-end/db/comandos/`
* Estrutura de tabelas pode ser consultada em:
  `back-end/db/tables/`

---

## 8. Conclusão

O sistema atinge seu objetivo de **organizar e digitalizar os processos do setor de informática**, trazendo mais eficiência, confiabilidade e segurança no gerenciamento de dados.
Além disso, sua arquitetura modular permite **expansão futura**, podendo ser adaptado para outras áreas administrativas.

---

