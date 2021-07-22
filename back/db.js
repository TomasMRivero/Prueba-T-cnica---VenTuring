'use strict';
require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

//Configuracion de la base de datos
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_COLLECTION
};


var db;


//Conexion con la base de datos
function connectDatabase(){
    if(!db){
        db = mysql.createConnection(settings);
        db.connect((err) => {
            if(!err){
                console.log('Conexion con la base de datos establecida.');
            }else{
                console.log('Error al conectar con la base de datos.');
            }
        });
    }
    //Para usar async..await
    db.query = util.promisify(db.query).bind(db);
    return db;
}

module.exports = connectDatabase