require("dotenv").config();
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds/search?q=`;

const getDogByName = async (req, res) => {
  try {
    const { name } = req.query;
  
    // Consultar la API externa
    const response = await axios.get(`${URL}${name}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    const apiData = response.data;

    // Mapear los datos de la API
    const apiRazas = apiData.map((e) => ({             
      id: e.id,
      name: e.name,
      image: e.image.url,
      height: e.height.metric,
      weight: e.weight.metric,
      temperaments: [e.temperament],
      life_span: e.life_span
    }));

    // Consultar la base de datos local
    const dbRazas = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
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


    // "id": "35419c6c-6269-49a5-b487-c37a5b5d42a5",
    // "name": "juancho",
    // "image": "https://i.pinimg.com/564x/42/ca/8f/42ca8f2de4c4d913329ccdd2f32746c2.jpg",
    // "height": "645 - 34343",
    // "weight": "3 - 33",
    // "life_span": "3",
    // "temperaments": [
    //   {
    //     "id": 1,
    //     "name": "Stubborn",
    //     "temperament_dog": {
    //       "dogId": "35419c6c-6269-49a5-b487-c37a5b5d42a5",
    //       "temperamentId": 1
    //     }
    //   },

    // Combinar resultados de la API y la base de datos local
    const allRazas = [...apiRazas, ...obj];

    if (allRazas.length === 0) {
      return res.status(404).json({ message: "No se encontraron razas de perros." });
    }

    res.json(allRazas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar las razas de perros" });
  }
};

module.exports = getDogByname;
