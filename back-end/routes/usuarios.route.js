import express from 'express';
import { adicionarUsuario, obterTodosUsuarios, removerUsuario } from '../db/tables/usuarios.js';
import validateToken from '../services/auth.guard.js';
import { adicionarDefensor } from '../db/tables/defensor.js';
import { adicionarServidor } from '../db/tables/servidor.js';
import { inserirEstagiario } from '../db/tables/estagiario.js';


const router = express.Router();

// Rota para listar todos os usuários (com nome e cargo)
router.get('/usuarios', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    try {
        const usuarios = await obterTodosUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para adicionar um novo usuário a partir de uma pessoa existente
router.post('/usuarios', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { cargo, cargoId } = req.body;

    if (!cargo || !cargoId) {
        return res.status(400).json({ error: 'Os campos "cargo" e "cargoId" são obrigatórios.' });
    }

    try {
        const novoUsuario = await adicionarUsuario(cargo, cargoId);
        res.status(201).json(novoUsuario);
    } catch (err) {
        // Tratar erro de chave duplicada (usuário já existe)
        if (err.code === '23505') { // unique_violation
            return res.status(409).json({ error: `Este ${cargo} já está cadastrado como usuário.` });
        }
        res.status(500).json({ error: err.message });
    }
});

// Rota para criar um novo usuário E a pessoa associada (defensor, servidor, etc.)
router.post('/usuarios/novo', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { cargo, nome } = req.body;

    if (!cargo || !nome) {
        return res.status(400).json({ error: 'Os campos "cargo" e "nome" são obrigatórios.' });
    }

    try {
        let novaPessoa;
        switch (cargo) {
            case 'defensor':
                novaPessoa = await adicionarDefensor(nome);
                break;
            case 'servidor':
                novaPessoa = await adicionarServidor(nome);
                break;
            case 'estagiario':
                novaPessoa = await inserirEstagiario(nome);
                break;
            default:
                return res.status(400).json({ error: 'Cargo inválido.' });
        }

        if (!novaPessoa || !novaPessoa.id) {
            throw new Error('Falha ao criar o registro da pessoa.');
        }

        const novoUsuario = await adicionarUsuario(cargo, novaPessoa.id);
        res.status(201).json(novoUsuario);

    } catch (err) {
        if (err.code === '23505') { // unique_violation
             return res.status(409).json({ error: `O nome "${nome}" já pode existir para o cargo de ${cargo} ou o usuário já está cadastrado.` });
        }
        console.error("Erro ao criar novo usuário com nome:", err);
        res.status(500).json({ error: 'Ocorreu um erro interno ao criar o usuário.' });
    }
});

// Rota para remover um usuário
router.delete('/usuarios/:id', async (req, res) => {
    if (!validateToken(req.headers.authorization)) {
        return res.status(401).json({ error: 'Token inválido ou ausente' });
    }
    const { id } = req.params;

    try {
        const usuarioRemovido = await removerUsuario(id);
        if (!usuarioRemovido) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // Rota para atualizar um usuário
// router.put('/usuarios/:id', async(req, res) => {
//     if (!validateToken(req.headers.authorization)) {
//         return res.status(401).json({ error: 'Token inválido ou ausente' });
//     }
//     const {id} = req.params;
//     const {cargo, nome} = req.body;

//     if (!nome && !cargo) {
//         return res.status(400).json({ error: 'Pelo menos um campo deve ser fornecido para atualização.' });
//     }

//     try {
//         const usuarioAtualizado = await atualizarUsuario(id, { cargo, nome });
//         if (!usuarioAtualizado) {
//             return res.status(404).json({ error: 'Usuário não encontrado.' });
//         }
//         res.json(usuarioAtualizado);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })

export default router;
