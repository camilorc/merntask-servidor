const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB()

//Habilitamos Cors
app.use(cors());

//Habilitamos express.json . para leer el body como json en peticiones post
//Se debe pasar en el header Content-Type: application/json
app.use( express.json({extended:true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

app.listen(PORT,() => {
    console.log(`EL servidor esta funcionand en el puerto ${PORT}`)
})