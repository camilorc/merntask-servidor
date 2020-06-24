const mongoose = require('mongoose')


const TareaSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    creado:{
        type:Date,
        default:Date.now
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Proyecto',
        require:true
    },
    estado: {
        type:Boolean,
        default:false
    }


})

module.exports = mongoose.model('Tarea',TareaSchema)