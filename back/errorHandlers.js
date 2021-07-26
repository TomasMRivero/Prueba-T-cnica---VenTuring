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
const YaExiste = {cosigo: 'YaExiste', mensaje:'Ya existe', status: 400};
const NoExiste = {codigo: 'NoExiste', mensaje:'No existe', status: 404};
const ArchivoVacio = {codigo: 'ArchivoVacio', mensaje: 'El archivo está vacío', status:400};

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
    ArchivoVacio
}