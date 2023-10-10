const { Dog, Temperament } = require("../db");

const postDog = async (req, res) => {
  try {
    const { name, height, weight, temperaments } = req.body;

    if (!name || !height || !weight || !temperaments) {
      return res.status(400).json('Faltan datos');
    }

    // Buscar o crear el perro por sus características principales
    const [newDog, created] = await Dog.findOrCreate({
      where: { name, height, weight },
    });

    const temperamentArray = Array.isArray(temperaments)
      ? temperaments
      : [temperaments];

    const associatedTemperaments = [];

    await Promise.all(
      temperamentArray.map(async (temperament) => {
        const trimmedTemperament = temperament.trim();
        const foundTemperament = await Temperament.findOne({
          where: { name: trimmedTemperament },
        });

        if (foundTemperament) {
          await newDog.addTemperamentos(foundTemperament);
          associatedTemperaments.push(foundTemperament.name);
        }
      })
    );

    return res.json("SUCCESSFULLY CREATED");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postDog;
