const cocheService = require('../service/coche.service');

const getCochesPorMarca = async (req, res) => {
    try {
        const marca = req.query.marca; 
        const coches = await cocheService.consultarCochesPorMarca(marca);
        res.status(200).json(coches);
    } catch (error) {
        res.status(500).json({ 
            error: "Fallo en el controlador o servicio", 
            mensajeReal: error.message 
        });
    }
};

const addCoche = async (req, res) => {
    try {
        const nuevoCoche = await cocheService.crearNuevoCoche(req.body);   
        res.status(201).json(nuevoCoche);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCochesPorMarca, addCoche };