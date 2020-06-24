const moogose = require('mongoose')
require ('dotenv').config({path: 'variables.env'})

const conectarDB = async () => {
    try {

        await moogose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log('Base de datos Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;