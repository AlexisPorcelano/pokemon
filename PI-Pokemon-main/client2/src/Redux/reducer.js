import {
  ADD_POKEMON,
  CHANGE,
  DEL_POKEMON,
  GET_DETAIL,
  GET_POKEMONS,
} from "./actions";

let initState = {
  pokemons: [],
  pokeBackUp: [],
  types: [],
  change: false,
  detail: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        change: false,
        // pokeBackUp:
        //   state.pokeBackUp.length === 0
        //     ? action.payload
        //     : [...state.pokeBackUp],
      };
    case ADD_POKEMON:
      return {
        ...state,
        pokeBackUp: [...state.pokeBackUp, action.payload],
        change: true,
      };
    case DEL_POKEMON:
      return {
        ...state,
        pokeBackUp: state.pokeBackUp.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
        change: true,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
