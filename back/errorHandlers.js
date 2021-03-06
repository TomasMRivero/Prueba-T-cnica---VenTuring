'use strict';

//Auth
const NoLogueado = {codigo: 'NoLogueado', mensaje: "No estás logueado", status: 401};
const TokenInvalido = {codigo: 'TokenInvalido', mensaje: 'Token inválido', status: 401};
const PassIncorrecta = {codigo: 'PassIncorrecta', mensaje: 'Contraseña incorrecta', status: 400};
const UsuarioNoValido = {codigo: 'UsuarioNoValido', mensaje: 'Usuario no válido', status :400};

//Pelicula
const FaltaArchivo = {codigo: 'FaltaArchivo', mensaje:'No se subió un archivo', status: 400};
const FaltanDatos = {codigo: 'FaltanDatos', mensaje:'Faltan datos', status: 400};
const FormatoIncorrecto = {codigo: 'FormatoIncorrecto', mensaje:'Formato incorrecto', status: 400};
const YaExiste = {codigo: 'YaExiste', mensaje:'Ya existe', status: 400};
const NoExiste = {codigo: 'NoExiste', mensaje:'No existe', status: 404};
const ArchivoVacio = {codigo: 'ArchivoVacio', mensaje: 'El archivo está vacío', status:400};

//Funcion que va en el catch y devuelve el error
async function devolverError(res, err){
    //verifica que el código tenga un codigo de error y un status.
    //si no lo tiene devuelve error por defecto.
    const status = (err) => {return(err.status?err.status:500)}
    const message = (err) => {return(err.mensaje?err.mensaje:"error inesperado")}
    console.error(err.codigo);
    //respuesta del servidor
    res.status(status(err)).json(message(err));
}

module.exports = {
    NoLogueado,
    TokenInvalido,
    PassIncorrecta,
    UsuarioNoValido,
    FaltaArchivo,
    FaltanDatos,
    FormatoIncorrecto,
    YaExiste,
    NoExiste,
    ArchivoVacio,
    devolverError
}