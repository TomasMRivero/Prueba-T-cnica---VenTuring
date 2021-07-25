'use strict';

const service = require('../services/authService.js');

//registrar usuario nuevo
async function registrarUsuario(params){
    const {
        alias,
        pass
    } = params;

    //verificar que se ingresen los datos
    if (
        !alias || !alias.trim() || 
        !pass || ! pass.trim()
    ){
        throw ("faltan datos")
    }
    //verificar que el formato del alias
    if (
        alias.trim().length > 30 ||
        alias.trim().indexOf(" ") != -1
    ){
        throw ("formato incorrecto")
    }
    //verificar que el usuario no esté registrado
    const setParams = await service.verificarUsuario(params);
    //devuelve id del usuario nuevo
    const resp = await service.registrarUsuario(setParams);
    //devuelve id y alias
    return {
        id: resp.insertId,
        alias: setParams.alias
    }

}

async function loguearUsuario(params){
    if(!params.alias || !params.alias.trim() || !params.pass){
        throw ('faltan datos')
    };
    const usuario = await service.autenticar(params);
    
    const token = await service.generarToken(usuario);

    return token;
}

module.exports = {
    registrarUsuario,
    loguearUsuario
}