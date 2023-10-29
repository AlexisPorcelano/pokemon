import {
  CHANGE,
  DEL_POKEMON,
  FILTER,
  GET_DETAIL,
  GET_POKEMONS,
  GET_TYPES,
  ORDER,
  RESET,
  ORIGIN,
  SEARCH,
  CHANGE_PAGE,
} from "./actions";

let initState = {
  pokemons: [],
  pokeCards: [],
  page: 1,
  numPages: 1,
  types: [],
  change: false,
  detail: {},
  backUp: [],
  newState: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      let data = [...action.payload]
      let pages = []
      while(data.length > 0){
        let page = data.splice(0, 12)
        pages.push(page)
      }
      return {
        ...state,
        numPages: pages.length,
        pokemons: action.payload,
        newState: action.payload,
        pokeCards: pages,
        backUp: pages,
      }
    case SEARCH: 
      return {
        ...state,
        newState: state.pokemons.filter((pokemon) => pokemon.name === action.payload),
        page: 1,
        change: true
      }
    case DEL_POKEMON:
      return {
        ...state,
        newState: state.newState.filter(pokemon => pokemon.id !== action.payload),
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
        return {
          ...state,
          newState: state.newState.sort((a, b) => a.name.localeCompare(b.name)),
          change: true,
        };
      }
      if (action.payload === "des") {
        return {
          ...state,
          newState: state.newState.sort((a, b) => b.name.localeCompare(a.name)),
          change: true,
        };
      }
      if (action.payload === "atk+") {
        return {
          ...state,
          newState: state.newState.sort((a, b) => b.attack - a.attack),
          change: true,
        }
      }
      if (action.payload === "atk-"){
        return{
          ...state,
          newState: state.newState.sort((a, b) => a.attack - b.attack),
          change: true,
        }
      }

      if (action.payload === ''){
        return state
      }
    case FILTER:
      if (action.payload === '') {
        return {...state}
      }
    
      return {
        ...state,
        newState: state.pokemons.filter((pokemon) =>
          pokemon.Types.some((type) => type.name === action.payload)
        ),
        change: true,
      };
    case ORIGIN:

      if (action.payload === '') return state
      if (action.payload === 'From API') {
        return {
          ...state, 
          newState: state.pokemons.filter((pokemon) => pokemon.origin === 'API'),
          change: true,
        }
      }
      if (action.payload === 'From database') {
        return {
          ...state, 
          newState: state.pokemons.filter((pokemon) => pokemon.origin === 'database'),
          change: true,
        }
      }
    case RESET:
      return {
        ...state,
        newState: state.pokemons,
        change: true,
      }
    case CHANGE:
          let newData = [...state.newState]
          let newPages = []
          while(newData.length > 0){
            let page = newData.splice(0, 12)
            newPages.push(page)
          }
      return{
        ...state,
        numPages: newPages.length,
        backUp: state.pokeCards,
        pokeCards: newPages,
        change: false,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
