const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader)
        return res.status(403).json({ message: "Header de autorização não encontrado" });

    const [bearer, token] = authHeader.split(" ");

    // console.log({ bearer, token }); // Mostra no terminal o Bearer e o Token, apenas para fins de teste

    if(!/^Bearer$/.test(bearer))
        return res.status(403).json({ message: "Header de autorização mal formatado" });

    if(!token)
        return res.status(403).json({ message: "JWT Token não encontrado" });

    jwt.verify(token, process.env.JWT_SECRET, (err, {usuario}) => {
        if(err) return res.status(403).json({ message: "JWT Token inválido" });

        req.usuarioId = usuario._id;

        // console.log(req.usuarioId);

        next();
    });
}

module.exports = verificarJwt;