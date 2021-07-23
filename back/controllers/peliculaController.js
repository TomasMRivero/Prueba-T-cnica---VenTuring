'use strict';
const fs = require('fs');
const util = require('util');

const service = require('../services/peliculaService.js');

//hacer promisify de readFile para poder usarlo con async..await
const readFile = util.promisify(fs.readFile);

//obtener la información del archivo subido, abrirlo,
//armar un array de objetos y cargarlos en la base de datos
async function subirLista(file){

   
    //abrir el csv a partir de su ubicación y
    //guardar su información en una variable
    const data = await readFile(file.path)

    //obtiene un array de objetos {titulo, descripcion, anio}
    const lista = await service.procesarArchivo(data);
}

module.exports = {
    subirLista
}