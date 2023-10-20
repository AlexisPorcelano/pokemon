// recibe el pokemon y lo guarda en la base de datos relacionandolo ademas con sus tipos
// recibe la info por body

const axios = require("axios");
const { Pokemon } = require("../db.js");

const postPokemon = async (req, res) => {
  try {
    const data = req.body;

    console.log(req.body);

    const newPokemon = await Pokemon.create({
        name: data.name,
        image: data.sprites.front_default,
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
      });

    if (!newPokemon) {
      res.status(400).json({ error: "Bad request" });
    } else {
      res.status(201).json({ newPokemon });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemon;
