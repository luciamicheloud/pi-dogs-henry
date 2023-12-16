require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

// Configuración de Sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: console.log, // Puedes cambiar a false para deshabilitar el logging
});

// Importación de modelos
const modelDefiners = [];
const modelsPath = path.resolve(__dirname, 'models'); // Asegúrate de que la ruta sea absoluta

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(modelsPath, file));
    modelDefiners.push(model);
  });

// Inyección de la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalización de los nombres de modelos
const capitalizedModels = Object.entries(sequelize.models).map(([name, model]) => [
  name.charAt(0).toUpperCase() + name.slice(1),
  model,
]);

sequelize.models = Object.fromEntries(capitalizedModels);

// Relaciones entre modelos
const { Dog, Temperament } = sequelize.models;
Dog.belongsToMany(Temperament, { through: 'temperament_dog', timestamps: false, as: 'temperaments' });
Temperament.belongsToMany(Dog, { through: 'temperament_dog', as: 'temperaments' });

module.exports = {
  ...sequelize.models, // Importar modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // Importar la conexión así: { conn } = require('./db.js');
};

