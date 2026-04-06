    const { Sequelize, DataTypes } = require('sequelize');

// 1. Configuración de la conexión a la base de datos
const sequelize = new Sequelize('concesionario_rmz', 'root', process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306
});

// 2. Mapeo de la tabla T_COCHE
const Coche = sequelize.define('Coche', {
    identificador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cilindrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'T_COCHE', 
    timestamps: false 
});

module.exports = { sequelize, Coche };