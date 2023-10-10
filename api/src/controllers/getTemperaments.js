const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {

    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiBreeds = response.data;

    const allTemperaments = new Set();


    apiBreeds.forEach((breed) => {
      const temperaments = breed.temperament?.split(", ");
      if (temperaments) {
        temperaments.forEach((temperament) =>
          allTemperaments.add(temperament.trim())
        );
      }
    });


    await Promise.all(
      [...allTemperaments].map((temperament) =>
        Temperament.findOrCreate({ where: { name: temperament } })
      )
    );


    const dbTemperaments = await Temperament.findAll();

    res.json(dbTemperaments);
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los temperaments");
  }
};

module.exports = getTemperaments

