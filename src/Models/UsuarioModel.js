const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    // O ID é atribuído automaticamente pelo mongoose
    nome : string,
    nickname : string,
    email : string,
    jogo : string,
    elo : string,
    senha : string,
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;