require("dotenv").config();
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";

    if (source === "api") {
      // Traer datos de la API
      const URL = `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`;
      const response = await axios.get(URL);
      const dogApi = response.data;

      const dogResponse = {
        id: dogApi.id,
        name: dogApi.name,
        image: `https://cdn2.thedogapi.com/images/${dogApi.reference_image_id}.jpg`,
        height: dogApi.height.metric,
        weight: dogApi.weight.metric,
        life_span: dogApi.life_span,
        temperaments: dogApi.temperament.split(', ').map(temp => ({ name: temp }))
      };

      res.json([dogResponse]);
    } else {
      // Traer datos de la base de datos local
      const dog = await Dog.findByPk(id, {
        include: [{ model: Temperament, as: "temperaments" }],
      });

      const dogResponse = {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperaments: dog.temperaments.map(temp => ({ name: temp.name }))
      };

      res.json([dogResponse]);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json("error al obtener detalle de la raza");
  }
};

module.exports = getDogById;
