const { Coche } = require('../model/coche.model');

// Buscar coches por marca 
const findByMarca = async (marcaBuscada) => {
    return await Coche.findAll({
        where: { marca: marcaBuscada }
    });
};

const save = async (datosCoche) => {
    // 1. Buscamos cuál es el número de identificador más alto en la base de datos
    const maxId = await Coche.max('identificador');
    
    // 2. Si no hay coches, empezamos en 1. Si los hay, le sumamos 1 al máximo.
    datosCoche.identificador = (maxId || 0) + 1;
    
    // 3. Ahora sí, guardamos el coche con su nuevo ID
    return await Coche.create(datosCoche); 
};

module.exports = { findByMarca, save };