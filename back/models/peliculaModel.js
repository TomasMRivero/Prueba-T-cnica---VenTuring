'use strict';
const connectDatabase = require('../db');

//conexion con la base de datos
const db = connectDatabase();
const qy = db.query;

//buscar película por título
async function buscarPelicula(searchParams){
    return await qy('SELECT * FROM `pelicula` WHERE titulo = ?', [searchParams]);
}

//cargar pelicula en la bdd
async function cargarPelicula(setParams){
    return await qy('INSERT INTO `pelicula` SET ?', [setParams])
}

module.exports = {
    buscarPelicula,
    cargarPelicula
}