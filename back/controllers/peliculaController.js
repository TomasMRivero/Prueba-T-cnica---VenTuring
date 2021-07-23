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

    //recorrer el array y verificar si ya estan cargadas las películas
    let existentes = [];
    let cargadas = [];
    for (const obj in lista){
        const existe = await service.verificarPelicula(lista[obj]);
        if (existe) {
            //si la pelicula ya existe
            //la carga en una lista para películas existentes
            existentes.push(lista[obj].titulo);
        }else{
            //si la película no existe
            //la carga en la base de datos y aumenta el contador
            const resp = await service.cargarPelicula(lista[obj]);
            if(!resp){
                throw error;
            }
            cargadas.push(lista[obj].titulo);
        }
    }
    //devuelve un objeto
    //{existentes: [peliculas existentes], cargadas: [películas cargadas con éxito]}
    return{existentes, cargadas}
}

module.exports = {
    subirLista
}