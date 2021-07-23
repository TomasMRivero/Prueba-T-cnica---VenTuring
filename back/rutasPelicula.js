'use strict';
const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

//importar controlador
const controller = require('./controllers/peliculaController.js');

//directorio donde se van a guardar los csv y nombre de los archivos
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
//subir archivo
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        
        //verificar que sea .csv

        if(file.mimetype == "text/csv"){
            //formato correcto
            return cb(null, true);
        } else{ 
            //formato incorrecto
            return cb(null, false);
        }
    }
});

route
//cargar libro desde csv
    .post('/', upload.single("lista"), async(req, res) => {

        try {
            //verificar que se cargó un archivo
            if(!req.file){
                //no se subió ningun archivo o el formato no es correcto
                throw ("no se subió archivo");
            }
            //se subió un archivo del formato correcto
            const resp = await controller.subirLista(req.file)
            console.log(resp);
            res.send("ok").status(200)
        } catch (error) {
            console.log(error);
            res.send(error).status(400);
        }
    })



module.exports = route;