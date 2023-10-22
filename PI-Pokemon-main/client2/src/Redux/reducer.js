import {
  ADD_POKEMON,
  // CREATE_POKEMON,
  DEL_POKEMON,
  GET_DETAIL,
  GET_POKEMONS,
  GET_TYPES,
} from "./actions";

let initState = {
  pokemons: [],
  pokeCards: [],
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
        // pokeCards:
        //   state.pokeCards.length === 0
        //     ? action.payload
        //     : [...state.pokeCards],
      };
    case ADD_POKEMON:
      return {
        ...state,
        pokeCards: [...state.pokeCards, action.payload],
        change: true,
      };
    case DEL_POKEMON:
      return {
        ...state,
        pokeCards: state.pokeCards.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
        change: true,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
