const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const postDog = async (req, res) => {
  const { temperaments, ...razaData } = req.body;

  try {
    // Crear la raza de perro en la base de datos
    const raza = await Dog.create(razaData);

    if (temperaments && temperaments.length > 0) {
      // Buscar temperaments en la base de datos y relacionarlos con la raza
      for (const temperament of temperaments) {
        const tempId = await Temperament.findOne({
          where: {
            name: {
              [Op.iLike]: `%${temperament}%`,
            },
          },
        });

        if (tempId) {
          await raza.addTemperament(tempId);
        }
      }
    }

    res.status(201).send(raza);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = postDog;
