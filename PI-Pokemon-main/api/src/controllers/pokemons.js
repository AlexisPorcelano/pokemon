// const getPokemons = async (req, res) => {
//   // Se encarga de retornar los Pokémon guardados en el servidor
//   try {
//     const pokemons = await Pokemon.findAll({ include: "Types" });

//     if (!pokemons) {
//       res.status(404).json({ error: "Could not retrieve data" });
//     } else {
//       res.status(200).json(pokemons);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const { Pokemon, Types } = require("../db.js");
const axios = require("axios");

const getPokemons = async (req, res) => {
  try {
    const count = await Pokemon.count();
    let assets = 0

    if (count === 0) {
      let url = "https://pokeapi.co/api/v2/pokemon";
      let pokemons = [];

      while (url) {
        // hace un bucle para recorrer la api
        try {
          const response = await axios.get(url, { timeout: 10000 });
          const { data } = response; // esta respuesta es un nodo con 19 pokemones

          if (!data) {
            res.status(404).json({ error: "Data not found" });
            return;
          } else {
            for (const result of data.results) {
              // se itera sobre el nodo
              if (result.url) {
                try {
                  const pokemonResponse = await axios.get(result.url, {
                    //se hace un get de cada pokemon
                    timeout: 10000,
                  });
                  const pokemonData = await pokemonResponse.data;
                  pokemons.push(pokemonData); //se guarda el pokemon en el array
                  assets++
                  console.log('loaded assets: ', assets, pokemonData.name);
                } catch (pokemonError) {
                  console.error(
                    "Error fetching Pokémon data:",
                    pokemonError.message
                  );
                }
              }
            }
            if (data.next) url = data.next;
            else url = false; //si no hay mas nodos termina el bucle
          }
        } catch (error) {
          console.error("Error fetching Pokémon list:", error.message);
          res.status(500).json({ error: "Failed to fetch Pokémon data" });
          return;
        }
      }
      const dataRetrieved = await Promise.all(pokemons); //validamos que se resolvieron todas las promesas
      console.log("all data retrieved");

      const validPokemons = dataRetrieved.filter((pokeData) => {
        return pokeData.sprites.front_default;
      }); // filtramos los pokemones que no tienen imagen

      const types = await Types.findAll(); // cargamos todos los types
      console.log(types);

      try { // se crean los pokemones en la database
        const createPromises = validPokemons.map(async (pokeData) => {
          console.log('creating pokemon: ', pokeData.name);
          const createdPokemon = await Pokemon.create({
            name: pokeData.name,
            image: pokeData.sprites.front_default,
            health: pokeData.stats[0].base_stat,
            attack: pokeData.stats[1].base_stat,
            defense: pokeData.stats[2].base_stat,
            speed: pokeData.stats[5].base_stat,
            height: pokeData.height,
            weight: pokeData.weight,
            origin: 'API'
          });
          //se crea un array con los nombres de los types
          const pokemonTypes = pokeData.types.map((e) => e.type.name);

          console.log('created pokemon with types: ', pokemonTypes);
          //se busca cada type del pokemon en la database
          const foundTypes = await Promise.all(
            pokemonTypes.map((name) => Types.findOne({ where: { name: name } }))
          );

          console.log(foundTypes);
          //se relaciona su type
          await createdPokemon.addTypes(foundTypes);

          console.log('PokemonXTypes relation completed');
          //se guarda el pokemon en createPromises
          return createdPokemon;
        });

        //se verifica que se cumplieron las promesas
        const createPokemons = await Promise.all(createPromises);
        res.status(200).json({message: 'pokedata loaded'});
      } catch (createError) {
        console.error(
          "Error creating valid Pokemon data:",
          createError.message
        );
        res.status(500).json({ error: "Failed to create valid Pokemon data" });
      }
      // si ya hay data en la database
    } else if (count > 0) {
      const allPokemons = await Pokemon.findAll({ include: Types });
      if (!allPokemons) {
        res.status(404).json({ error: "could not find pokemons" });
      } else {
        res.status(200).json(allPokemons);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getDetail = async (req, res) => {
  // se encarga de encontrar el detalle de un pokemon especifico
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
    let found = await Pokemon.findOne({
      where: { id: parsedId },
      include: "Types",
    });
    if (!found) res.status(404).json({ error: "pokemon detail not found" });
    if (found) res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPokemons,
  getDetail,
};
