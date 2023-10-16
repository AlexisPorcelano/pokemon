const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getPokemons,
  getName,
  deletePokemon,
  getDetail,
} = require("../controllers/pokemons.js");

const getTypes = require("../controllers/getTypes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);

router.get("/pokemons/:name", getName);

router.delete('/delPokemon/:id', deletePokemon)

router.get('/pokemonDetail/:id', getDetail)

router.get("/types", getTypes);

module.exports = router;
