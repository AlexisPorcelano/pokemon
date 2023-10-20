import axios from "axios";

export const ADD_POKEMON = "ADD_POKEMON";

export const DEL_POKEMON = "DEL_POKEMON";

export const GET_POKEMONS = "GET_POKEMONS";

export const GET_TYPES = "GET_TYPES";

export const GET_DETAIL = "GET_DETAIL";

export const CREATE_POKEMON = "CREATE_POKEMON";

export const ORDER = "ORDER";

export const FILTER = "FILTER";

export const createPokemon = (pokeData) => {
  console.log(pokeData);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/pokemons/${pokeData.name}`
      );
      const { data } = response;
      dispatch({
        type: CREATE_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemonDetail/${id}`
      );
      const { data } = response;
      dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/pokemons");
      const data = response.data;
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/types");
      const data = response.data.pokemonTypes;
      dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const addPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons/${name}`
      );
      if (response.data) {
        dispatch({
          type: ADD_POKEMON,
          payload: pokemon,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const delPokemon = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/delPokemon/${id}`
      );
      if (response.data) {
        dispatch({
          type: DEL_POKEMON,
          payload: id,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const order = (value) => {
  return {
    types: ORDER,
    payload: value,
  };
};

export const filter = (value) => {
  return {
    types: FILTER,
    payload: value,
  };
};
