'use strict';
const connectDatabase = require('../db');

//conexion con la base de datos
const db = connectDatabase();
const qy = db.query;

//buscar película por título
async function buscarPelicula(searchParams){
    console.log(searchParams);
    return await qy('SELECT * FROM `pelicula` WHERE ?', [searchParams]);
}

//cargar pelicula en la bdd
async function cargarPelicula(setParams){
    return await qy('INSERT INTO `pelicula` SET ?', [setParams]);
}

//borrar pelicula de la bdd
async function borrarPelicula(id){
    await qy('DELETE FROM `pelicula` WHERE id = ?', [id]);
    console.log("borrado con éxito");
}

//editar registro en la bdd
async function editarPelicula(id, setParams){
    return await qy('UPDATE `pelicula` SET ? WHERE ?', [setParams, id]);
}

//pasa limit y offset como parámetros devuelve lista de elementos
//correspondientes a esa pagina
async function obtenerLista(pagina){
    return await qy('SELECT * FROM `pelicula` LIMIT ? OFFSET ?', [pagina.limit, pagina.offset]);
}

module.exports = {
    buscarPelicula,
    cargarPelicula,
    borrarPelicula,
    editarPelicula,
    obtenerLista
}