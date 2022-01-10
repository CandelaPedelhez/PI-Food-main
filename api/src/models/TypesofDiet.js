const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('typesofDiet', { /* sin id acá porque nosotros no vamos a crear ninguna dieta, y el id se crea por defecto */
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};
