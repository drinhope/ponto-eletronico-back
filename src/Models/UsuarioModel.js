const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    // O ID é atribuído automaticamente pelo mongoose
    nome : String,
    nickname : String,
    email : String,
    jogo : String,
    elo : String,
    senha : String
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;