// crea un array con todos los pokemons de la api
// la api es una linked list
// esta funcion guarda el nombre del pokemon con una url que contiene sus detalles
// esto se debe a que la data es demasiado grande y de esta forma cuando se necesite 
// el determinado pokemon se puede consultar a dicha url por sus detalles sin tener que recorrer
// la api como si fuera una linked list cortando de esta forma los tiempos de carga

const axios = require("axios");

const getPokemons = async (req, res) => {
  try {
    const pokemons = [];

    let url = "https://pokeapi.co/api/v2/pokemon";

    while (url) {
      const response = await axios.get(url);
      const { data } = response;

      if (!data) {
        res.status(404).json({ error: "Data not found" });
        return;
      }

      pokemons.push(...data.results);

      url = data.next;
    }
    
    res.status(200).json({ pokemons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemons;


// const axios = require("axios");

// const getPokemons = async (req, res) => {
//   try {
//     let url = "https://pokeapi.co/api/v2/pokemon";
//     let pokemons = [];

//     while (url) {
//       const response = await axios.get(url);
//       const { data } = response;

//       if (!data) {
//         res.status(404).json({ error: "Data not found" });
//         return;
//       }

//       const pokemonPromises = data.results.map(async (e) => {
//         const response = await axios.get(e.url);
//         if (!response) res.status(404).json({ error: "Data not found" });
//         return response.data;
//       });

//       const pokemonData = await Promise.all(pokemonPromises);

//       pokemons = [...pokemons, pokemonData];

//       url = data.next;
//     }

//     res.status(200).json({ pokemons });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = getPokemons;
