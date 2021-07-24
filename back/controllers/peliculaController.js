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
            cargadas.push({
                id: resp.insertId,
                ...lista[obj]
            });
        }
    }
    //devuelve un objeto
    //{existentes: [peliculas existentes], cargadas: [películas cargadas con éxito]}
    return{existentes, cargadas}
}
//obtener la información desde el body, verificar que los datos
//estén en el formato correcto y cargar la película en la base de datos
async function subirPelicula(params){
    const{
        titulo,
        descripcion,
        anio
    } = params;

    //verificar que los parámetros no estén vacíos
    if (!titulo || !titulo.trim() ||
        !descripcion || !descripcion.trim() ||
        !anio || !anio.trim()
    ){
        //si están vacíos devuelve error
        throw("faltan datos")
    }else if(
        //verifica que en año se ingrese un número entero
        !Number.isInteger(Number(anio))
    ){
        //si el formato es incorrecto devuelve error
        throw("formato incorrecto")
    }
    
    //hacer trim a los parámetros y guardarlos en un nuevo objeto
    const setParams={
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        anio: Number(anio)
    };

    //verificar si existe la película
    const existe = await service.verificarPelicula(setParams);
    if(existe){
        //si existe arroja error
        throw "ya existe esa película"
    }
    //si no existe la carga a la bdd
    const resp = await service.cargarPelicula(setParams);
    //devuelve un objeto con la película guardada
    return {
        id: resp.insertId,
        ...setParams
    }
}
//tomar la id de la ruta y eliminar al libro correspondiente
async function borrarPelicula(id){
    //verificar que exista la película con esa id
    await service.buscarPorId(id);
    await service.borrarPelicula(id);
}

//tomar la id de la ruta y los datos del body, verificar que estén en el
//formato correcto y actualizar la película en la base de datos
async function editarPelicula(reqParams){
    //verificar si existe la pelicula con esa id.
    //si existe, la guarda en una variable para tomar
    //los valores originales en caso de ser necesario
    const buscar = await service.buscarPorId(reqParams.id);

    //verificar que el formato del año sea correcto
    if (!Number.isInteger(Number(reqParams.anio))){
        throw ("formato invalido")
    }
    //verificar si se ingresaron datos para modificar y, si no se ingresaron,
    //tomar los valores originales
    const titulo = ((!reqParams.titulo || !reqParams.titulo.trim())?buscar.titulo:reqParams.titulo.trim());
    const descripcion = ((!reqParams.descripcion || !reqParams.descripcion.trim())?buscar.descripcion:reqParams.descripcion.trim());
    const anio = ((!reqParams.anio || !reqParams.anio.trim())?buscar.anio:Number(reqParams.anio));

    console.log({titulo, descripcion, anio})
}

module.exports = {
    subirLista,
    subirPelicula,
    borrarPelicula,
    editarPelicula
}