const cocheService = require('../service/coche.service');

const getCochesPorMarca = async (req, res) => {
    try {
        const marca = req.query.marca; 
        const coches = await cocheService.consultarCochesPorMarca(marca);
        res.status(200).json(coches);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

const addCoche = async (req, res) => {
    try {
        const nuevoCoche = await cocheService.crearNuevoCoche(req.body);   
        // Devolvemos 201 Created si todo va bien
        res.status(201).json(nuevoCoche);
    } catch (error) {
        // Si el servicio lanza un error ej: cilindrada 0 devolver 400 Bad Request
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCochesPorMarca, addCoche };