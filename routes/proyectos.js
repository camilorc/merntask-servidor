//Rutas para Proyectos
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')


//Crear un proyecto
// /api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es oblicagorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)


// /api/proyectos Obtenermos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

router.get('/:id',
    auth,
    proyectoController.getProyecto
)

// /api/proyectos Actualizamos un proyecto por ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es oblicagorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)


// /api/proyectos Eliminamos un proyecto por ID
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;