'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var AsignaturaController = require('../controllers/asignaturaController');
 
// Llamamos al router
var api = express.Router();
 
//  Guardar Autos
api.post('/asignatura', AsignaturaController.guardar);
api.get('/asignatura', AsignaturaController.listar);
api.get('/asignaturasimple', AsignaturaController.listarSimple)
// Exportamos la configuración
module.exports = api;

