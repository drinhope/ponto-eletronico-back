const dotenv = require("dotenv");
const app = require("./App");
const Loaders = require("./Loaders/index");

dotenv.config();
Loaders.start();

app.listen(process.env.PORT, () => console.log("Servidor rodando!"))