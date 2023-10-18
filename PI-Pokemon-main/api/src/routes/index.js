const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getPokemons,
  getDetail,
} = require("../controllers/pokemons.js");

const getPokeName = require('../controllers/getPokeName.js')

const deletePokemon = require('../controllers/deletePokemon.js')

const getTypes = require("../controllers/getTypes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);

router.get("/pokemons/:name", getPokeName);

router.delete('/delPokemon/:id', deletePokemon)

router.get('/pokemonDetail/:id', getDetail)

router.get("/types", getTypes);

module.exports = router;
