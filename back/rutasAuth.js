'use strict';
const express = require('express');
const route = express.Router();

//importar controlador
const controller = require('./controllers/authController.js');
const { devolverError } = require('./errorHandlers.js');

route
//registrar usuario
    .post('/registro', async(req, res) => {
        try {
            const resp = await controller.registrarUsuario(req.body);
            res.send(resp).status(201);
        } catch (error) {
            devolverError(res, error);            
        }
    })
//iniciar sesion
    .post('/login', async(req, res) => {
        try {
            const token = await controller.loguearUsuario(req.body);
            res.send({token}).status(200);
        } catch (error) {
            devolverError(res, error);             
        }
    })
//cerrar sesion
    .post('/logout', async(req, res) => {
        try {
            //manda el token y la fecha de expiración como argumento
            //para guardarlos en una lista negra en la bdd.
            //De esta forma, si el usuario se desloguea, no se podrá utilizar ese token.
            const token = req.headers.authorization;
            const expDate = new Date(req.usuario.exp  * 1000)
            const resp = await controller.desloguearUsuario({token, expDate})
            res.send(resp).status(200);            
        } catch (error) {
            devolverError(res, error);             
        }
    })

module.exports = route