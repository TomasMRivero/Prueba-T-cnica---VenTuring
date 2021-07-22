'use strict'
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());


//Conexion con el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});