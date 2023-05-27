const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    // O ID é atribuído automaticamente pelo mongoose
    nome: {
        type: String,
        unique: true,
    },
    nickname : String,
    email: {
        type: String,
        unique: true,
    },
    jogo : String,
    elo : String,
    senha : String,
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;