require("dotenv").config();
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const getAllDogs = async (req, res) => {
  try {

    const response = await axios.get(URL);
    const apiBreeds = response.data;


    const filteredBreeds = apiBreeds.map((breed) => ({
      id: breed.id,
      name: breed.name,
      image: breed.image.url,
      height: breed.height.metric,
      weight: breed.weight.metric,
      temperaments: breed.temperament ? breed.temperament.split(',').map((temperament) => temperament.trim()) : [],
      life_span: breed.life_span
    }));


    const dbBreeds = await Dog.findAll({
      include: [
        {
          model: Temperament,
          as: "temperaments",
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
      raw: true,
    });
    
    // Modificar el resultado para obtener los temperaments como una matriz de cadenas separadas por coma
    dbBreeds.forEach((dog) => {
      if (dog['temperaments.name']) {
        dog.temperaments = dog['temperaments.name'].split(',');
      } else {
        dog.temperaments = []; // Si el campo es nulo, asignar una matriz vacía
      }
      delete dog['temperaments.name'];
    });
    
    const allBreeds = [...filteredBreeds,...dbBreeds];

    res.json(allBreeds);


  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener los perros');
  }
};

module.exports = getAllDogs;
