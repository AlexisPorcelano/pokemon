import {
  ADD_POKEMON,
  // CREATE_POKEMON,
  DEL_POKEMON,
  FILTER,
  GET_ALL,
  GET_DETAIL,
  GET_POKEMONS,
  GET_TYPES,
  ORDER,
  RESET,
} from "./actions";

let initState = {
  pokemons: [],
  pokeCards: [],
  types: [],
  change: false,
  detail: {},
  backUp: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        change: false,
      }
    case ADD_POKEMON:
      return {
        ...state,
        pokeCards: [...state.pokeCards, action.payload],
        backUp: [...state.backUp, action.payload],
        change: true,
      };
    case DEL_POKEMON:
      return {
        ...state,
        pokeCards: state.pokeCards.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
        backUp: state.backUp.filter(
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
    case ORDER:
      if (action.payload === "asc") {
        console.log('asc');
        return {
          ...state,
          pokeCards: state.backUp.sort((a, b) => a.name.localeCompare(b.name)),
          change: true,
        };
      }
      if (action.payload === "des") {
        console.log('des');
        return {
          ...state,
          pokeCards: state.backUp.sort((a, b) => b.name.localeCompare(a.name)),
          change: true,
        };
      }
      if (action.payload === ''){
        return state
      }
    case FILTER:
      if (action.payload === '') {
        return state
      }
    
      return {
        ...state,
        pokeCards: state.backUp.filter((pokemon) =>
          pokemon.Types.some((type) => type.name === action.payload)
        ),
        change: true,
      };
    case RESET:
      console.log('reset');
      return {
        ...state,
        pokeCards: state.backUp,
        change: true,
      }
    case GET_ALL:
      return{
        ...state,
        pokeCards: state.pokemons,
        change: true,
      }
    default:
      return state;
  }
};

export default reducer;
