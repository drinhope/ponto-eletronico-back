const mongoose = require("mongoose");

async function startDB(){
    await mongoose.connect('mongodb+srv://grupo3traineecpe:7W73KTKjICbUSGnS@pontogrupo3.huqatrw.mongodb.net/?retryWrites=true&w=majority')
}

module.exports = startDB;
