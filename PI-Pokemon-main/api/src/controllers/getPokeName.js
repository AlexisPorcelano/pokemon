const { Pokemon, Types } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

const getPokeName = async (req, res) => {
  const { name } = req.params;

  try {
    const foundPokemon = await Pokemon.findOne({
      where: { name: name },
      include: Types,
    });

    if (foundPokemon) {
      console.log("Pokemon is already in the database");

      res.status(200).json(foundPokemon);
    } else {
      console.log("Trying to fetch pokemon from the api");

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const { data } = response;

      if (!data) {
        res.status(404).json({ error: "Pokemon not found" });
      } else {
        console.log("Pokemon found, creating in database");

        const pokemonTypeNames = data.types.map(
          (typeData) => typeData.type.name
        );

        const foundTypes = await Promise.all(
          pokemonTypeNames.map((typeName) =>
            Types.findOne({ where: { name: typeName } })
          )
        );

        if (!foundTypes)
          res.status(404).json({ error: "Could not find types" });

        console.log("found types, creating pokemon");

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

        await newPokemon.addTypes(foundTypes);
        console.log("pokemon-type relation completed");

        const associatedTypes = await newPokemon.getTypes();

        newPokemon.dataValues.Types = associatedTypes;

        res.status(200).json(newPokemon);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokeName;
