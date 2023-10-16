const pokemons = [];

const axios = require("axios");

const getPokemons = (req, res) => {
  //se encarga de retornar los pokemon guardados en el servidor
  res.status(200).json({ pokemons });
};

const getName = async (req, res) => {
  //se encarga de buscar por nombre un pokemon en la api y guardarlo en el servidor
  const { name } = req.params;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const { data } = response;
    if (!data) {
      res.status(404).json({ error: "pokemon not found" });
    } else {
      console.log('pokemon found, but is it already added?');
      // se verifica si el pokemon ya fué añadido al servidor
      let pokemonAlreadyAdded = false;
      pokemons.forEach((e) => {
        if (e.id === data.id) {
          pokemonAlreadyAdded = true;
          console.log('it is already added');
          return res.status(409).json({ error: "pokemon already added" });
        }
      });

      if (!pokemonAlreadyAdded) {
        console.log('adding the pokemon');
        pokemons.push(data);
        console.log("pokemon added to array: ", data);
        res.status(200).json(data);
      }
    }
    console.log(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePokemon = (req, res) => {
  //se encarga de eliminar un pokemon del servidor
  const { id } = req.params;
  const parsedId = parseInt(id);

  let found = false;

  pokemons.forEach((pokemon, index) => {
    if (pokemon.id === parsedId) {
      found = true;
      pokemons.splice(index, 1);
      res.status(200).json({ message: "Pokemon deleted successfully" });
      return;
    }
  });

  if (!found) {
    res.status(404).json({ error: "Pokemon not found" });
  }
};

const getDetail = async (req, res) => {
  // se encarga de encontrar el detalle de un pokemon especifico
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${parsedId}`
    );
    const { data } = response;
    if (!data) {
      // si no se encuentra con la peticion se intentará encontrar el pokemon en el array del servidor
      console.log("attempting retrieving the info from the server");
      let found = null;
      pokemons.map((e) => {
        e.id === parsedId ? (found = e) : null;
      });
      if (!found) res.status(404).json({ error: "pokemon detail not found" });
      if (found) res.status(200).json(found);
    } else res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getName,
  getPokemons,
  deletePokemon,
  pokemons,
  getDetail,
};
