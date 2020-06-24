//rutas para login de  usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

//Crear un usuario
// /api/auth
router.post('/', //definimos solo '/' ya que cuando lo importamos le damos /api/usuarios
    authController.autenticarUsuario
)

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;