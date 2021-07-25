'use strict';
require('dotenv').config();
const express = require('express');
const unless = require('express-unless');
const jwt = require('jsonwebtoken');

//rutas
const rutasPelicula = require('./rutasPelicula');
const rutasAuth = require('./rutasAuth')

const {buscarToken} = require('./services/authService')

const app = express();

const PORT = process.env.PORT || 4000;


app.use(express.json());

//middleware para autorizacion
const auth = async(req, res, next) => {
    try {
        //verifica que el usuario este logueado
        let token = req.headers['authorization'];
        if(!token){
            throw("no estas logueado");
        }

        token = token.replace('Bearer ', '');

        //buscar token en la lista negra
        const resp = await buscarToken({token});
        if (resp.length>0) {
            throw ("token inválido")
        }

        //verifica que el token sea válido
        jwt.verify(token, process.env.TOKEN_SECRET, (err, usuario) => {
            if (err) {
                throw ("token invalido")
            } else {
                //envía los datos del usuario al request
                req.usuario = usuario;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.send(error).status(400);        
    }
};

auth.unless = unless;

app.use(auth.unless({
    path:[
        {url:'/api/auth/login', methods:['POST']},
        {url:'/api/auth/registro', methods:['POST']}
    ]
}));

app.use('/api/pelicula', rutasPelicula);
app.use('/api/auth', rutasAuth);

//Directorio donde se van a guardar los .csv
const publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir)); 

//Conexion con el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});