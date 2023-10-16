import { useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();
  const parsedId = parseInt(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/pokemonDetail/${parsedId}`
        );
        const { data } = response;
        if (data) {
          console.log(data);
          setPokemon(data);
        }
      } catch (error) {
        window.alert("Error fetching data:", error);
      }
    }
    fetchData(); 
  }, [parsedId]); 

  if (pokemon.name) {
    const slice = pokemon.name.slice(1);
    const upper = pokemon.name.charAt(0).toUpperCase();
    pokemon.name = upper + slice;
  }
  console.log(pokemon);

  return (
    <div>
      <Link to={'/pokedex'} >Back</Link>
      <h1>Name: {pokemon.name}</h1>
      <img src={pokemon.sprites && pokemon.sprites.front_default} alt="sprite" />
      <h2>
        Types:
        {pokemon.types && pokemon.types.length > 0
          ? pokemon.types.map((e, i) => (
              <h3 key={i}>{e.type.name}</h3>
            ))  
          : null}
      </h2>
      <h3>Height: {pokemon.height} Ft.</h3>
      <h3>Weight: {pokemon.weight} Lbs.</h3>
    </div>
  );
}
