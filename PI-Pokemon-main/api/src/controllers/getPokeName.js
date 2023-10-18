const { Pokemon, Types } = require("../db.js"); // Assuming you have a Type model
const axios = require("axios");

const getPokeName = async (req, res) => {
  const { name } = req.params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { data } = response;

    if (!data) {
      res.status(404).json({ error: "Pokemon not found" });
    } else {
      console.log("Pokemon found, but is it already added?");
      
      const foundPokemon = await Pokemon.findOne({ where: { name: data.name } });

      if (foundPokemon) {
        console.log("Pokemon is already added to the database");
        res.status(409).json({ error: 'Pokemon already added' });
      } else {
        console.log("Adding the Pokemon");

        const pokemonTypes = data.types.map((typeData) => typeData.type.id);

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

        await newPokemon.addType(pokemonTypes[0])

        if(pokemonTypes[1]) await newPokemon.addTypes(pokemonTypes[1])

        console.log("Pokemon added to the database:");
        res.status(200).json(newPokemon);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokeName;
