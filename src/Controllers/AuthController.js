const UsuarioModel = require("../Models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req,res) {
        try {
            const { email, senha } = req.body;

            const usuarioEncontrado = await UsuarioModel.findOne({ email }).select("+senha");
            if(!usuarioEncontrado) 
                return res.status(403).json({message: "Email ou senha inválidos"});
            
            const ehCorrespondente = await bcrypt.compare(senha, usuarioEncontrado.senha);

            if(!ehCorrespondente)
                return res.status(403).json({message: "Senha inválida"});

            const { senha: hashedSenha, ...usuario } = usuarioEncontrado.toObject();

            const token = jwt.sign({
                usuario
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE }); 

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: "Deu ruim aqui!!!", error: error.message }); 
        }
    }
}

module.exports = new AuthController();