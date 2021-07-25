'use strict';
const express = require('express');
const route = express.Router();

//importar controlador
const controller = require('./controllers/authController.js');

route
//registrar usuario
    .post('/registro', async(req, res) => {
        try {
            const resp = await controller.registrarUsuario(req.body);
            res.send(resp).status(201);
        } catch (error) {
            console.log(error);
            res.send(error).status(400);            
        }
    })
    .post('/login', async(req, res) => {
        try {
            const token = await controller.loguearUsuario(req.body);
            res.send({token}).status(200);
        } catch (error) {
            console.log(error);
            res.send(error).status(400);            
        }
    })
    .post('/logout', async(req, res) => {
        try {
            console.log(req.usuario);
            const token = req.headers.authorization;
            const expDate = new Date(req.usuario.exp  * 1000)
            const resp = await controller.desloguearUsuario({token, expDate})
            res.send(resp).status(200);            
        } catch (error) {
            console.log(error);
            res.send(error).status(400);            
        }
    })

module.exports = route