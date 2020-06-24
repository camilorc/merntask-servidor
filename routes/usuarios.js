//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator')

//Crear un usuario
// /api/usuarios
router.post('/', //definimos solo '/' ya que cuando lo importamos le damos /api/usuarios
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Debes ingresar un email válido').isEmail(),
        check('password','La contraseña debe tener 6 caracteres').isLength({min:6}),
    ],
    usuarioController.crearUsuario
)

module.exports = router;
