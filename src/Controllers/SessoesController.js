const SessoesModel = require("../Models/SessoesModel");
const UsuarioModel = require("../Models/UsuarioModel");

class SessoesController{

    async create(req, res){ // O if funciona exatamente da mesma forma que no vídeo, porém ele pega o parâmetro body, já que quer verificar se o usuario existe para criar uma sessão
        try {
            const { id_usuario } = req.body;

            const usuariosEncontrado = await UsuarioModel.findById(id_usuario);

            if(!usuariosEncontrado)
                return res.status(404).json({ message: "Usuario não encontrado" });
            
            const sessoes = await SessoesModel.create(req.body);
            
            res.status(200).json(sessoes); 
        } catch (error) {
            res.status(500).json({ message: "Deu ruim aqui!!!", error: error.message });
        }
    }

    async read(req, res){
        try {
            const Sessoes = await SessoesModel.find().populate('id_usuario', '-senha');

            res.status(200).json(Sessoes);
        } catch (error) {
            res.status(500).json({ message: "Deu ruim aqui!!!", error: error.message });
        }
    }

    update(req, res){
        try {
            
        } catch (error) {
            res.status(500).json({ message: "Deu ruim aqui!!!", error: error.message }); 
        }
    }

    async delete(req, res){ // O if funciona exatamente da mesma forma que no vídeo, só adaptei as funções para as sessões, mas a lógica e os parâmetros são exatamente os mesmos
        try {    
            const { id_usuario } = req.params;
            
            const sessaoEncontrada = await SessoesModel.findOne({ id_usuario, });

            if(!sessaoEncontrada)
                return res.status(404).json({ message: "Sessão não encontrada" });
        
            await SessoesModel.deleteOne();

            res.status(200).json({"mensagem": "Sessão deletada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: "Deu ruim aqui!!!", error: error.message });
        }
    }
}

module.exports = new SessoesController(); 