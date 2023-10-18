export const ADD_POKEMON = "ADD_POKEMON";

export const DEL_POKEMON = "DEL_POKEMON";

export const GET_POKEMONS = "GET_POKEMONS";

export const GET_DETAIL = "GET_DETAIL";

export const CHANGE = "CHANGE";

import axios from "axios";

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

export const change = () => {
  return {
    action: CHANGE,
    payload: null,
  };
};

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/pokemons");
      const data = response.data;
      console.log('action creator: ', data);
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {}
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
          type: ADD_POKEMON,
          payload: id,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};
