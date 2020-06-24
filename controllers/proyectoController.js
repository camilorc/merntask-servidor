//Extraemos el MODELO
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

//Creamos las funciones del Controller
exports.crearProyecto = async (req,res) => {

    //Revisamos si hay errores de las validaciones del chek en la ruta
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(500).json({errores:errores.array()})
    }


    try {
        console.log(req.body)
        let proyecto = new Proyecto(req.body)

        //Pasamos el usuario según el token
        //En el middleware agregamos al req el payload del token
        //Que en este caso es el usuario (objeto)
        proyecto.creador = req.usuario.id

        proyecto.save()
        res.json(proyecto)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerProyectos = async (req,res) => {

    //Obtener los proyectos del usuario
    try {
        
        let usuarioID = req.usuario.id;

        let proyectos = await Proyecto.find({creador:usuarioID});

        res.json({proyectos})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msng: 'Hubo un error'})
    }


}

exports.getProyecto = async (req,res) => {
    try {
        console.log(req.params.id)
        //Buscamos el proyecto por ID
        let proyectoBD = await Proyecto.findById(req.params.id)
        
        //Comprobamos que el usuario sea el creador
        if(proyectoBD.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        res.json({proyectoBD})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al encontrar el proyecto'})
    }


}

exports.actualizarProyecto = async (req,res) => {
    
    //Extraemos del body
    const {nombre} = req.body;

    //Creamos nuevo objeto para actualizar
    let nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {

        //Buscamos el proyecto por ID
        let proyectoBD = await Proyecto.findById(req.params.id)
        
        //Comprobamos que el usuario sea el creador
        if(proyectoBD.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        //Actualizamos el proyecto
        let proyecto = await Proyecto.findByIdAndUpdate(req.params.id,nuevoProyecto,{new:true})

        res.json({proyecto})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al actualizar'})
    }
}

exports.eliminarProyecto = async (req,res) => {
    
    try {

        //Buscamos el proyecto por ID
        let proyectoBD = await Proyecto.findById(req.params.id)
        
        //Comprobamos que el usuario sea el creador
        if(proyectoBD.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        //Eliminamos el proyecto
        let proyecto = await Proyecto.findByIdAndDelete(req.params.id)

        res.json({proyecto})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al eliminar'})
    }
}