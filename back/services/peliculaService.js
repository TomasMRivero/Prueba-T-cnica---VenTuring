'use strict';
const model = require('../models/peliculaModel.js');

// procesar el archivo y generar un array de objetos
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
    
    //devolver array de objetos
    return(lista);
}

//verificar si la película ya existe
async function verificarPelicula(obj){
    const titulo = obj.titulo.trim();
    const resp = await model.buscarPelicula({titulo});

    //si existe devuelve true, si no, false
    return (resp.length > 0 ? true : false);
}

//llamar al model para cargar la película
async function cargarPelicula(obj){
    return await model.cargarPelicula(obj);
}

//verifica que exista la pelicula con esa id
async function buscarPorId(id){
    const resp = await model.buscarPelicula({id});
    if (resp.length==0){
        //si no existe devuelve error
        throw ("no existe")
    }
    return resp[0];
}

//busca pelicula por titulo, devuelve pelicula
async function buscarPorTitulo(titulo){
    const resp = await model.buscarPelicula({titulo});
    return resp.length==0?null:resp[0];
}

//borra la pelicula con la id dada
async function borrarPelicula(id){
    await model.borrarPelicula(id);
}

//edita la pelicula con la id dada
async function editarPelicula(id, setParams){
    return await model.editarPelicula(id, setParams);
}

//manda el limit y el offset como argumentos y devuelve los elementos
//correspondientes a esa pagina
async function obtenerLista(pagina){
    return await model.obtenerLista(pagina);
}

module.exports = {
    procesarArchivo,
    verificarPelicula,
    cargarPelicula,
    buscarPorId,
    borrarPelicula,
    editarPelicula,
    obtenerLista,
    buscarPorTitulo
}