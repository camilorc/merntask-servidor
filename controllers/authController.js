const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator');
const { findById } = require('../models/Usuario');

exports.autenticarUsuario = async (req, res) => {

   
    //extraemos el email y pasword
    const {email,password} = req.body

    try {

        let usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //Revisamos su password
        let passCorrecto = await bcryptjs.compare(password,usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'Password incorrecto'})
        }

        //Si todo es correcto
        const payload = {
            usuario: {
                id: usuario.id
            }

        }
        
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(err,token)=>{
            if(err) throw err;

            return res.json({token})
        })
        
    } catch (error) {
        console.log(error)
    }

}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req,res) => {
    try {

        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error al obtener el usuario'})
    }

}