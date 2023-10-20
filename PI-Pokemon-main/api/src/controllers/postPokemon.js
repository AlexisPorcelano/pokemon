const axios = require("axios");
const { Pokemon, Types } = require("../db.js");

const postPokemon = async (req, res) => {
  try {
    const pokeData  = req.body;

    console.log('pokemon data received');

    const foundTypes = await Promise.all(
      pokeData.types.map((typeName) =>
        Types.findOne({ where: { name: typeName } })
      )
    );

    console.log('types: ', foundTypes);

    console.log('creating pokemon');

    const newPokemon = await Pokemon.create({
        name: pokeData.name,
        image: pokeData.image,
        health: pokeData.health,
        attack: pokeData.attack,
        defense: pokeData.defense,
        speed: pokeData.speed,
        height: pokeData.height,
        weight: pokeData.weight,
      });

      console.log('relating types');

      await newPokemon.addTypes(foundTypes);
      console.log('pokemon-type relation completed');

    if (!newPokemon) {
      res.status(400).json({ error: "Bad request" });
    } else {
      res.status(201).json({ message: 'pokemon created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemon;
