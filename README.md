# SaaSDTI - Sistema de Gestão de Serviços de TI

## 📋 Sobre o Projeto

SaaSDTI é um sistema full-stack desenvolvido para gerenciar serviços de TI, incluindo ordens de serviço, controle de estoque e gestão de técnicos. O sistema é construído com uma arquitetura moderna, utilizando Next.js no front-end e Node.js com Express no back-end.

## 🛠 Tecnologias Utilizadas

### Front-end
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Radix UI (componentes de interface)
- Axios (requisições HTTP)
- Firebase (autenticação)

### Back-end
- Node.js
- Express
- PostgreSQL (pg)
- CORS
- Dotenv (configuração de ambiente)

## 🚀 Funcionalidades

- Gestão de Ordens de Serviço
  - Criação e acompanhamento de OS
  - Atribuição de técnicos
  - Controle de status e datas

- Controle de Estoque
  - Cadastro de equipamentos
  - Gestão de patrimônio
  - Controle de quantidade

- Gestão de Setores e Técnicos
  - Cadastro de setores
  - Gerenciamento de técnicos
  - Controle de marcas

## 💻 Pré-requisitos

- Node.js
- PostgreSQL
- NPM ou Yarn

## 🔧 Instalação

### Back-end

1. Navegue até a pasta do back-end:
```bash
cd back-end
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env com as seguintes variáveis:
```env
PORT=3001
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=nome_do_banco
```

4. Inicie o servidor:
```bash
npm run dev
```

### Front-end

1. Navegue até a pasta do front-end:
```bash
cd front-end
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌐 Endpoints da API

### Ordens de Serviço
- `GET /os` - Lista todas as ordens de serviço
- `POST /ordens` - Cria uma nova ordem de serviço

### Estoque
- `GET /estoque` - Lista todos os itens do estoque
- `POST /estoque` - Cadastra um novo item no estoque

### Outros Endpoints
- Setores
- Técnicos
- Marcas

## 👥 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Suporte

Para suporte e questões, por favor abra uma issue no repositório do projeto.