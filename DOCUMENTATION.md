# Documentação da Funcionalidade: Atualização de Perfil de Técnico

## 1. Visão Geral

O objetivo desta tarefa foi implementar e corrigir a funcionalidade que permite a um técnico logado no sistema atualizar suas próprias informações de perfil (nome e e-mail) e alterar sua senha de forma segura. A solução abrange tanto o back-end (a API) quanto o front-end (a interface do usuário).

---

## 2. Componentes Envolvidos

Os seguintes arquivos foram modificados ou tiveram sua lógica central implementada durante a resolução desta tarefa:

-   **Back-end**:
    -   `back-end/routes/tecnicos.js`: Contém a lógica da API para lidar com as requisições de atualização.

-   **Front-end**:
    -   `front-end/src/app/dashboard/MeuPerfil/_components/PerfilForm.tsx`: Componente que renderiza o formulário para alterar nome e e-mail.
    -   `front-end/src/app/dashboard/MeuPerfil/_components/PerfilFormSenha.tsx`: Componente com o formulário para alteração de senha.
    -   `front-end/src/services/tecnicos.service.ts`: Camada de serviço que faz a comunicação (chamadas `fetch`/`axios`) com a API do back-end.

---

## 3. Lógica do Back-end (API)

A principal alteração ocorreu na rota `PUT /tecnicos/:id`.

### Funcionamento

A rota foi desenhada para ser flexível e segura, lidando com atualizações parciais. Ela não exige que todos os dados do técnico sejam enviados a cada requisição.

1.  **Busca do Técnico**: Independentemente do que será atualizado, a rota primeiro busca o técnico no banco de dados pelo `id` para garantir que ele exista.

2.  **Atualização de Dados (Nome/Email)**: Se a requisição contém apenas `nome` e/ou `email`, a rota monta uma consulta SQL dinâmica para atualizar somente esses campos.

3.  **Atualização de Senha (Com Segurança)**:
    -   Para alterar a senha, a requisição **obrigatoriamente** precisa conter dois campos: `senha` (a nova senha) e `senhaAtual` (a senha antiga).
    -   O back-end primeiro verifica se o campo `senhaAtual` foi enviado. Se não, retorna um erro.
    -   Em seguida, ele usa a função `bcrypt.compare` para comparar a `senhaAtual` enviada pelo usuário com a senha criptografada (`hash`) que está salva no banco de dados.
    -   **Se a senha atual não for válida**, a operação é interrompida e um erro `401 (Não Autorizado)` é retornado, protegendo a conta contra alterações indevidas.
    -   **Se a senha for válida**, a nova senha é criptografada com `bcrypt.hash` e então a consulta de atualização é montada.

4.  **Construção Dinâmica da Query**: A consulta `UPDATE` é montada dinamicamente, incluindo apenas os campos que foram enviados na requisição. Isso torna a rota eficiente e adaptável a diferentes cenários de atualização.

5.  **Tratamento de Erros**: A rota está preparada para retornar status e mensagens de erro claras para diferentes situações:
    -   `404 Not Found`: Se o técnico com o `id` fornecido não existe.
    -   `401 Unauthorized`: Se a `senhaAtual` estiver incorreta.
    -   `409 Conflict`: Se o novo `email` enviado já estiver em uso por outro técnico.
    -   `500 Internal Server Error`: Para qualquer outra falha inesperada no servidor.

---

## 4. Lógica do Front-end

No front-end, a principal decisão de design foi separar a atualização de dados do perfil da atualização de senha para melhorar a experiência do usuário.

### Separação de Responsabilidades

-   **`PerfilForm.tsx`**: Este componente agora é responsável **apenas** por atualizar o nome e o e-mail. Ele tem seu próprio formulário e um botão "Salvar Alterações".
-   **`PerfilFormSenha.tsx`**: Este componente é focado **apenas** na alteração da senha. Ele possui seu próprio formulário e um botão "Atualizar Senha".

Essa separação evita confusão. O usuário realiza uma ação de cada vez, e os botões têm responsabilidades claras.

### Fluxo de Dados

1.  **Carregamento da Página**: Ao entrar na tela "Meu Perfil", os dados atuais do técnico (nome e e-mail) são carregados do back-end e exibidos nos campos do formulário.

2.  **Atualizando o Perfil**:
    -   O usuário altera o nome e/ou e-mail.
    -   Ao clicar em "Salvar Alterações", a função `atualizarTecnicoDados` do serviço é chamada, enviando um payload para a API contendo apenas os campos `nome` e `email`.

3.  **Atualizando a Senha**:
    -   O usuário preenche os campos "Senha Atual", "Nova Senha" e "Confirmar Nova Senha".
    -   O componente realiza validações iniciais (ex: se a nova senha e a confirmação são iguais).
    -   Ao clicar em "Atualizar Senha", a função `atualizarTecnicoDados` é chamada, mas desta vez com um payload contendo os campos `senha` e `senhaAtual`.

Ambas as ações utilizam a mesma rota `PUT /tecnicos/:id` no back-end, que, como explicado acima, é inteligente o suficiente para lidar com os dois tipos de requisição.