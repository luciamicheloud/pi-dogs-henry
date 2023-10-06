require("dotenv").config();
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds/search?q=`;

const getDogByname = async (req, res) => {
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
      imagen: e.image.url,
      altura: e.height.metric,
      peso: e.weight.metric,
      temperamentos: e.temperament,
      añosDeVida: e.life_span
    }));

    // Consultar la base de datos local
    const dbRazas = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [{ model: Temperament, as: 'temperamentos' }]
    });

    // Combinar resultados de la API y la base de datos local
    const allRazas = [...apiRazas, ...dbRazas];

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
