const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('typesofDiet', { /* sin id acá porque se crea por defecto, y las dietas en la api vienen en un arreglo, no tienen ID y no se pueden 'pisar' entonces */
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};
