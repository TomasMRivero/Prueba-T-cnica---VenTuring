'use strict';
require('dotenv').config();
const express = require('express');

//rutas
const rutasPelicula = require('./rutasPelicula');
const rutasAuth = require('./rutasAuth')

const app = express();

const PORT = process.env.PORT || 4000;


app.use(express.json());


app.use('/api/pelicula', rutasPelicula);
app.use('/api/auth', rutasAuth);

//Directorio donde se van a guardar los .csv
const publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir)); 

//Conexion con el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});