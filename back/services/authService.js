'use script';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function autenticar(params){
    const {
        alias,
        pass
    } = params;
    const resp = await model.buscarUsuario({alias: alias.trim()});
    if (resp.length === 0){
        throw ("no existe");
    }
    const usuario = resp[0];
    if(!bcrypt.compareSync(pass, usuario.pass)){
        throw ("contraseña incorrecta");
    };
    return {
        id: usuario.id,
        alias: usuario.alias
    };
}

async function generarToken(usuario){
    const tokenData = {
        id: usuario.id,
        alias: usuario.alias
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 // 24 hs
    });
    return token;
}

//registra usuario
async function registrarUsuario(setParams){
    return await model.registrarUsuario(setParams);
}

module.exports = {
    verificarUsuario,
    registrarUsuario,
    autenticar,
    generarToken
}