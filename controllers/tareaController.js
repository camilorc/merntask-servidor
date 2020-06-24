const express = require('express');
const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Creamos las funcionalidades

exports.crearTarea = async (req,res) => {

    //Validamos que no venga con errores del check
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(500).json({errores:errores.array()})
    }

    const {nombre,proyecto} = req.body

    //Buscamos el proyecto Actual
    const proyectoBD = await Proyecto.findById(proyecto);
    if(!proyectoBD){
        return res.status(404).json({msg:'Proyecto no existe'})
    }

    //Comprobamos que el usuario actual sea el creador del proyecto
    if(proyectoBD.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg:'No tiene permisos'})
    }

    //Guardamos la tarea nueva
    try {

        let tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea})

    } catch (error) {
        return res.status(500).json({msg: 'Hubo un error en el servidor'})
    }

    console.log('Creamos una tarea')

}

//Obtener tareas por ProyectoID
exports.obtenerTareas = async (req,res) => {
    //Obtener las tareas de la BD
    try {
        const {proyecto} = req.query
        
        //Buscamos el proyecto Actual
        const proyectoBD = await Proyecto.findById(proyecto);
        if(!proyectoBD){
            return res.status(404).json({msg:'Proyecto no existe'})
        }

        //Comprobamos que el usuario actual sea el creador del proyecto
        if(proyectoBD.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No tiene permisos'})
        }

        let tareas = await Tarea.find({proyecto}).sort({creado: -1})

        res.json({tareas})


    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error en la petición'})
    }


}

//Actualizar una tarea
exports.actualizarTarea = async (req,res) => {

    //Validamos que nombre no venga vacio
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(500).json({errores:errores.array()})
    }

    //Obtenemos el parámetro del id de la tarea a ser actualizada
    let id = req.params.id;
 
    try {

        let nuevaTarea = {};

        const {nombre,estado} = req.body

        if(nombre) nuevaTarea.nombre = nombre;
        if(estado != null) nuevaTarea.estado = estado;

        console.log(nuevaTarea)
        
        let tarea = await Tarea.findByIdAndUpdate(id,nuevaTarea,{new:true})

        res.json({tarea});

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error al intentar actualizar'})
    }

}

exports.eliminarTarea = async(req,res) => {

   //Obtenemos el parámetro del id de la tarea a ser eliminada
   let id = req.params.id;

   try {

    let tarea = await Tarea.findByIdAndDelete(id)

    res.json({tarea})
       
   } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error en el servidor'})
   }
}