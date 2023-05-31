const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SessoesModel = require("./SessoesModel");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    // O ID é atribuído automaticamente pelo mongoose
    nome: {
        type: String,
        unique: true,
    },
    nickname: {
        type: String,
        unique: true,
    },
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
    const usuario = this

    if(usuario.isModified("senha")) {  
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(usuario.senha, salt);

        usuario.senha = hash;

        //console.log({ salt, hash }); // Imprime no terminal essas informações (se der alum erro realacionado descomente para visualizar)
    }

    next();
});

UsuarioSchema.pre("deleteOne", { document: true, query: false }, async function(){
    const usuario = this

    return SessoesModel.deleteOne({ id_usuario: usuario._id });
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;