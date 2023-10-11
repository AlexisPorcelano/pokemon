// recibe todos los types de la api y los guarda en la base de datos si es que está vacia
// retorna un arreglo con los types
const axios = require("axios");
const { Types } = require("../db.js");

const getTypes = async (req, res) => {
  try {
    const count = await Types.count();

    if (count === 0) {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const { data } = response;

      if (!data) {
        return res.status(404).json({ error: "Data not found" });
      }

      const pokemonTypes = await Promise.all(
        data.results.map(async (e) => {
          const newType = await Types.create({
            name: e.name,
          });
          return newType;
        })
      );

      res.status(200).json({ pokemonTypes });
    } else {

        const pokemonTypes = await Types.findAll()
      res.status(200).json({ pokemonTypes});
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTypes;
