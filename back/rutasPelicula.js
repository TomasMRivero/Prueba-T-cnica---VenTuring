'use strict';
const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

//importar controlador
const controller = require('./controllers/peliculaController.js');
const { FaltaArchivo, FormatoIncorrecto, devolverError } = require('./errorHandlers.js');

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
    fileFilter: (req, file, cb) => {
        
        //verificar que sea .csv
        console.log(file)

        if(file.mimetype == "text/csv" || file.mimetype == 'application/vnd.ms-excel'){
            //formato correcto
            return cb(null, true);
        } else{ 
            //formato incorrecto
            return cb(null, false);
        }
    }
});

route
//cargar pelicula desde csv
    .post('/alta/csv', upload.single("lista"), async(req, res) => {

        try {
            //verificar que se cargó un archivo
            if(!req.file){
                //no se subió ningun archivo o el formato no es correcto
                throw FaltaArchivo;
            }
            //se subió un archivo del formato correcto
            const resp = await controller.subirLista(req.file);
            res.send(resp).status(201);
        } catch (error) {
            devolverError(res, error);        
        }
    })
//cargar pelicula desde pantalla de alta
    .post('/alta', async(req, res) => {

        try {
            const resp = await controller.subirPelicula(req.body);
            res.send(resp).status(201);
        } catch (error) {
            devolverError(res, error);    
        }

    })
//eliminar pelicula
    .delete('/:id', async(req, res) => {
        try {
            await controller.borrarPelicula(req.params.id);
            res.status(204).send();
        } catch (error) {
            devolverError(res, error);             
        }
    })
//editar pelicula
    .put('/:id', async(req, res) => {
        try {
            const request={
                id: req.params.id,
                ...req.body
            };
            const resp = await controller.editarPelicula(request);
            res.send(resp).status(200)
        } catch (error) {
            devolverError(res, error);                
        }
    })
//obener lista de peliculas con paginacion
//FORMATO: api/pelicula?limit=20&pagina=1
    .get('', async(req,res) => {
        try {
            //verificar que el numero de la página esté en el formato correcto
            if(!Number.isInteger(Number(req.query.pagina))){
                throw FormatoIncorrecto;
            };
            //calcular el offset según los elementos por página y la página
            const offset = req.query.limit * (req.query.pagina - 1);
            const pagina={
                limit: Number(req.query.limit),
                offset
            }
            //enviar limite y offset y retornar lista de películas
            const resp = await controller.obtenerLista(pagina);
            res.send(resp).status(200);         
        } catch (error) {
            devolverError(res, error);             
        }
    })
//buscar película por título
//FORMATO: api/pelicula/buscar?titulo=<titulo>
    .get('/buscar', async(req, res) =>{
        try {
            const resp = await controller.buscarPelicula(req.query.titulo);
            res.send(resp).status(200);         
        } catch (error) {
            devolverError(res, error);    
        }
    });


module.exports = route;