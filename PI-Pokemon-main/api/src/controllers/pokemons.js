const { Pokemon } = require("../db.js");

const axios = require("axios");

const getPokemons = async (req, res) => {
  // Se encarga de retornar los Pokémon guardados en el servidor
  try {
    const pokemons = await Pokemon.findAll({ include: "Types" });

    if (!pokemons) {
      res.status(404).json({ error: "Could not retrieve data" });
    } else {
      res.status(200).json(pokemons);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetail = async (req, res) => {
  // se encarga de encontrar el detalle de un pokemon especifico
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
      let found = await Pokemon.findOne({where: {id: parsedId}, include: "Types"});      if (!found) res.status(404).json({ error: "pokemon detail not found" });
      if (found) res.status(200).json(found);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPokemons,
  getDetail,
};
