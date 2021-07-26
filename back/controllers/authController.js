'use strict';

const { FaltanDatos, FormatoIncorrecto } = require('../errorHandlers.js');
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
        throw FaltanDatos;
    }
    //verificar que el formato del alias
    if (
        alias.trim().length > 30 ||
        alias.trim().indexOf(" ") != -1
    ){
        throw FormatoIncorrecto;
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

//login de usuario
async function loguearUsuario(params){
    
    //verificar que se ingresen los datos
    if(!params.alias || !params.alias.trim() || !params.pass){
        throw FormatoIncorrecto;
    };

    //verificar que la contraseña coincida
    const usuario = await service.autenticar(params);
    
    //generar token
    const token = await service.generarToken(usuario);

    return token;
}

//logout de usuario
async function desloguearUsuario(params){
    return await service.desloguearUsuario(params);
}

module.exports = {
    registrarUsuario,
    loguearUsuario,
    desloguearUsuario
}