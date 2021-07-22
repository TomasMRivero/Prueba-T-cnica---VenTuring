'use strict';
const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

//importar controlador
const controller = require('./controllers/peliculaController.js');



module.exports = route;