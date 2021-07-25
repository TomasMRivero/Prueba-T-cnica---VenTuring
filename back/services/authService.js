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

    //busca al usuario
    const resp = await model.buscarUsuario({alias: alias.trim()});
    if (resp.length === 0){
        throw ("no existe");
    }
    const usuario = resp[0];

    //verifica que la contraseña sea correcta
    if(!bcrypt.compareSync(pass, usuario.pass)){
        throw ("contraseña incorrecta");
    };

    //devuelve id y alias
    return {
        id: usuario.id,
        alias: usuario.alias
    };
}

async function generarToken(usuario){
    //datos que va a tener el token
    const tokenData = {
        id: usuario.id,
        alias: usuario.alias
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 // expira en 24 hs
    });
    return token;
}

//registra usuario
async function registrarUsuario(setParams){
    return await model.registrarUsuario(setParams);
}

//desloguear usuario
async function desloguearUsuario(params){
    await model.blacklistToken(params);
    return ("Sesion cerrada con éxito");
}

async function buscarToken(token){
    return await model.buscarToken(token);
}

module.exports = {
    verificarUsuario,
    registrarUsuario,
    autenticar,
    generarToken,
    desloguearUsuario,
    buscarToken
}