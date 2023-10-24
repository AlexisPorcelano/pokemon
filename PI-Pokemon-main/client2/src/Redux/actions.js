import axios from "axios";

export const ADD_POKEMON = "ADD_POKEMON";

export const DEL_POKEMON = "DEL_POKEMON";

export const GET_POKEMONS = "GET_POKEMONS";

export const GET_TYPES = "GET_TYPES";

export const GET_DETAIL = "GET_DETAIL";

// export const CREATE_POKEMON = "CREATE_POKEMON";

export const ORDER = "ORDER";

export const FILTER = "FILTER";

export const RESET = 'RESET';

export const GET_ALL = 'GET_ALL'

// export const createPokemon = (pokeData) => {
//   console.log(pokeData);
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/pokemons/${pokeData.name}`
//       );
//       const { data } = response;
//       dispatch({
//         type: CREATE_POKEMON,
//         payload: data,
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
// };

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
      window.alert('Failed to load resources, please check your internet connection');
    }
  };
};

export const addPokemon = (name) => {
  console.log("actions add", name);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons/${name}`
      );
      if (response.data) {
        console.log(response.data);
        dispatch({
          type: ADD_POKEMON,
          payload: response.data,
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
};

export const delPokemon = (id) => {
  return {
    type: DEL_POKEMON,
    payload: id,
  };
};

export const order = (value) => {
  return {
    type: ORDER,
    payload: value,
  };
};

export const filter = (value) => {
  return {
    type: FILTER,
    payload: value,
  };
};

export const reset = () => {
  return {
    type: RESET,
    payload: null,
  }
}

export const getAll = () => {
  return {
    type: GET_ALL,
    payload: null,
  }
}