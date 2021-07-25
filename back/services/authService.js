'use script';

const bcrypt = require('bcrypt');

const model = require('../models/authModel.js');

//verifica que el usuario no esté registrado
//devuelve usuario y clave encriptada
async function verificarUsuario(user){
    //verificación
    const resp = await model.buscarUsuario({alias: user.alias.trim()});
    if (resp.length > 0){
        throw ("ya existe");
    }
    //encriptar clave
    const passEncriptada = await bcrypt.hash(user.pass, 10);

    return {
        alias: user.alias.trim(),
        pass: passEncriptada
    }
}

//registra usuario
async function registrarUsuario(setParams){
    return await model.registrarUsuario(setParams);
}

module.exports = {
    verificarUsuario,
    registrarUsuario
}