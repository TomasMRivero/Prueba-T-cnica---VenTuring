'use strict';
const connectDatabase = require('../db');

//conexion con la base de datos
const db = connectDatabase();
const qy = db.query;

//buscar usuario en la bdd
async function buscarUsuario(searchParams){
    return await qy('SELECT * FROM `usuario` WHERE ?', [searchParams]);
}

//dar de alta usuario en la bdd
async function registrarUsuario(setParams){
    return await qy('INSERT INTO `usuario` SET ?', [setParams]);
}

module.exports = {
    buscarUsuario,
    registrarUsuario
}