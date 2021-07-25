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

module.exports = route