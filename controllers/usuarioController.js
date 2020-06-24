const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')



exports.crearUsuario = async (req,res) => {

    //comporbamos los errores. Devuelve un array
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores:errores.array()
        })
    }

    const {email,password} = req.body

    try {
        
        let usuario = await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({
                msg:'El email ya existe'
            })
        }

        //Creamos el nuevo objeto usuario
        usuario = new Usuario(req.body);

        //hash la contraseña
        usuario.password = await bcryptjs.hash(password,10);

        //Guardamos el nuevo usuario
        await usuario.save();

        //Creamos y firmamos el token
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        },(err,token)=>{
            if(err) throw err;

            //Respondemos con el TOKEN
            res.json({token})
        })

    } catch (error) {
        console.log(error);
        res.send('hubo un error');
    }
}