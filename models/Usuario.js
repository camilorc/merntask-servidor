const moogose = require('mongoose');

const UsuarioSchema = moogose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    registro:{
        type:Date,
        default:Date.now()
    }

});

module.exports = moogose.model('Usuario',UsuarioSchema);