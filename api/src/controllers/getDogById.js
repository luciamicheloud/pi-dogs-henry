require("dotenv").config();
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const URL = "https://api.thedogapi.com/v1/breeds"

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"

    const dog = source === "api"
      ? await axios.get(`${URL}/${id}?api_key=${API_KEY}`)
      : await Dog.findByPk( id,{include:{model:Temperament,as : "temperaments"}})

      

    if (source === "api") {
      const dogApi = [dog.data] // lo pongo en una array para poder mapearlo


      const filtereddogApi = dogApi.map((perro) => ({
        id: perro.id,
        name: perro.name,
        height: perro.height.metric,
        image: `https://cdn2.thedogapi.com/images/`+perro.reference_image_id+`.jpg`,
        weight: perro.weight.metric,
        temperaments: perro.temperament,
        life_span: perro.life_span
      }));

      

      res.json(filtereddogApi)
    } else {
      // traerme los temperaments
      res.json(dog)
    }

  } catch (error) {
    console.log(error)
    res.status(400).json("error al obtener detalle de la raza")
  }
}


module.exports = getDogById;
