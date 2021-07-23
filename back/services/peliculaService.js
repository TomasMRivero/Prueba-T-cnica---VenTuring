'use strict';
const model = require('../models/peliculaModel.js');

// procesar el archivo, obtener todos los valores y
// generar un array de objetos
async function procesarArchivo(data){
    var lista = [];
    const buffer = data.toString();
    
        //verificar que el archivo no esté vacío
        if (!buffer.trim()){
            throw {mensaje: "está vacío"};
        }
    
        //hacer un array donde cada elemento sea una línea del csv
        const arr = buffer.split('\r\n');
    
        //separar los valores de cada línea y crear los objetos
        for (const i in arr){
            const objData = arr[i].split(';');
            const obj = {
                titulo: objData[0],
                descripcion: objData[1],
                anio: objData[2]
            };
            lista.push(obj);
        }
    
    return(lista);
}

//verificar si la película ya existe
async function verificarPelicula(obj){
    const resp = await model.buscarPelicula(obj.titulo);
    
    //si existe devuelve true, si no, false
    return (resp.lenght > 0 ? true : false);
}

module.exports = {
    procesarArchivo,
    verificarPelicula
}