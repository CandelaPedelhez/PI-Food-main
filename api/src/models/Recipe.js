const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID, /* para que no se pise con los id de la db */
      defaultValue: DataTypes.UUIDV4, /* es que se usa el UUID v4 standard */
      allowNull: false, /* no puede estar vacío */
      primarykey: true /* clave primaria */
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumendelplato: {

    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
    
  });
};
