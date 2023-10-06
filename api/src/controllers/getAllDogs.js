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
      imagen: breed.image.url,
      altura: breed.height.metric,
      peso: breed.weight.metric,
      temperamentos: breed.temperament ? breed.temperament.split(',').map((temperament) => temperament.trim()) : [],
      añosDeVida: breed.life_span
    }));


    const dbBreeds = await Dog.findAll({
      include: [
        {
          model: Temperament,
          as: "temperamentos",
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
      raw: true,
    });
    
    // Modificar el resultado para obtener los temperamentos como una matriz de cadenas separadas por coma
    dbBreeds.forEach((dog) => {
      if (dog['temperamentos.name']) {
        dog.temperamentos = dog['temperamentos.name'].split(',');
      } else {
        dog.temperamentos = []; // Si el campo es nulo, asignar una matriz vacía
      }
      delete dog['temperamentos.name'];
    });
    
    const allBreeds = [...filteredBreeds,...dbBreeds];

    res.json(allBreeds);


  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener los perros');
  }
};

module.exports = getAllDogs;
