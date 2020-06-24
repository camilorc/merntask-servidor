const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//Creamos las rutas

//Crear una tarea POST
router.post(
    '/',
    auth,
    [
        check('nombre','Nombre de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);


//Obtener las tareas get segpun proyecto
router.get(
    '/',
    auth,
    tareaController.obtenerTareas
);


//Actualizar una tareas 
router.put(
    '/:id',
    auth,
    [
        check('nombre','Nombre de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.actualizarTarea
);

//Aliminar una tareas 
router.delete(
    '/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;