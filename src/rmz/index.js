const express = require('express');
const { sequelize } = require('./model/coche.model');
const cocheController = require('./controller/coche.controller'); 

const app = express();
const PORT = 3000;

app.use(express.json()); 

// ¡Conectamos las rutas al controlador!
app.get('/coches', cocheController.getCochesPorMarca);
app.post('/coches', cocheController.addCoche);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
        app.listen(PORT, () => {
            console.log(`API Rest del concesionario escuchando en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error crítico: No se pudo conectar a la base de datos:', error);
    });