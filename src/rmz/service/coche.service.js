const cocheRepository = require('../repository/coche.repository');

const consultarCochesPorMarca = async (marca) => {
    if (!marca) return [];
    return await cocheRepository.findByMarca(marca);
};

const crearNuevoCoche = async (datosCoche) => {
    // LÓGICA DE NEGOCIO
    if (datosCoche.cilindrada <= 0 || !datosCoche.cilindrada) {
        throw new Error("La cilindrada debe ser mayor que 0");
    }
    if (!datosCoche.marca || !datosCoche.modelo) {
        throw new Error("Faltan campos obligatorios");
    }
    // Si todo está correcto, mandamos a guardar
    return await cocheRepository.save(datosCoche);
};

module.exports = { consultarCochesPorMarca, crearNuevoCoche };