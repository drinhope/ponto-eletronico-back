const mongoose = require("mongoose");

async function startDB(){
    await mongoose.connect('mongodb+srv://pedroaraujo:5mW3b6RVDHrSucde@ponto-eletronico.s8i5cko.mongodb.net/?retryWrites=true&w=majority')
}

module.exports = startDB;
