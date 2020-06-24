const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {

    //Leer el token del header
    const token = req.header('x-auth-token') //Va a depender la clave del header

    //Revisamos si no hay token
    if(!token){
        return res.status(401).json({msg: 'Token no existe'})
    }

    //Validar el token
    try {
        
        const valido = jwt.verify(token,process.env.SECRETA)
        req.usuario = valido.usuario //le pasamos lo que enviamos como payload en el token al crearlo
        next();

    } catch (error) {
        return res.status(401).json({msg:'Token no válido'})
    }

}