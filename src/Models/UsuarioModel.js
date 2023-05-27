const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    // O ID é atribuído automaticamente pelo mongoose
    nome: {
        type: String,
        unique: true,
    },
    nickname: String,
    email: {
        type: String,
        unique: true,
    },
    jogo: String,
    elo: String,
    senha: {
        type: String,
        select: false,
    },
});

UsuarioSchema.pre("save", async function(next){
    const user = this

    if(user.isModified("senha")) {  
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.senha, salt);

        user.senha = hash;

        console.log({ salt, hash });
    }

    next();
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;