const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

    // O que o usuário precisa ter?
    //
    // nome : String,
    // nickname : String,
    // email : String,
    // jogo : String,
    // elo : String,
    // senha : String

const create = validateRequest({
    body: z.object({
        nome: z.string({ required_error: "O nome é obrigatório" }),
        nickname: z.string({ required_error: "O nickname é obrigatório" }),
        email: z.string({ required_error: "O email é obrigatório" }).email("O email é inválido"),
        jogo: z.string({ required_error: "O jogo é obrigatório" }),
        elo: z.string({ required_error: "O elo é obrigatório" }),
        senha: z.string({ required_error: "A senha é obrigatória" }),
    }),
});

const destroy = validateRequest({
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
    }),
});

const update = validateRequest({
    body: z.object({
        nome: z.string().optional(),
        nickname: z.string().optional(),
        email: z.string().email("O email é inválido").optional(),
        jogo: z.string().optional(),
        elo: z.string().optional(),
        senha: z.string().optional(),
    }),
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
    }),
});

module.exports = {
    create,
    destroy,
    update,
};