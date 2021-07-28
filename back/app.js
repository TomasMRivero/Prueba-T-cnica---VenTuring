'use strict';
require('dotenv').config();
const express = require('express');
const unless = require('express-unless');
const jwt = require('jsonwebtoken');
const cors = require('cors');


//rutas
const rutasPelicula = require('./rutasPelicula');
const rutasAuth = require('./rutasAuth')

const {buscarToken} = require('./services/authService');
const { TokenInvalido, NoLogueado, devolverError } = require('./errorHandlers');

const app = express();

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());

//middleware para autorizacion
const auth = async(req, res, next) => {
    try {
        //verifica que el usuario este logueado
        let token = req.headers['authorization'];
        if(!token){
            throw NoLogueado;
        }

        token = token.replace('Bearer ', '');

        //buscar token en la lista negra
        const resp = await buscarToken({token});
        if (resp.length>0) {
            throw TokenInvalido;
        }

        //verifica que el token sea válido
        jwt.verify(token, process.env.TOKEN_SECRET, (err, usuario) => {
            if (err) {
                throw TokenInvalido;
            } else {
                //envía los datos del usuario al request
                req.usuario = usuario;
                next();
            }
        });
    } catch (error) {
        devolverError(res, error);        
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