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

    const dbRazas = await Dog.findAll({
      include: [{ model: Temperament, as: 'temperaments' }]
    });

    const obj = dbRazas.map((e) => ({             
      id: e.id,
      name: e.name,
      image: e.image,
      height: e.height,
      weight: e.weight,
      temperaments: e.temperaments.map((temp)=> temp.name),
      life_span: e.life_span
    }));

    
    const allBreeds = [...filteredBreeds,...obj];

    res.json(allBreeds);


  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener los perros');
  }
};

module.exports = getAllDogs;
