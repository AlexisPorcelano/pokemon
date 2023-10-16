import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../Redux/actions";
import Card from "../Card/Card";

export default function Pokedex() {
  const pokemons = useSelector((state) => state.pokemons);
  const change = useSelector((state) => state.change);
  const pokeBackUp = useSelector((state) => state.pokeBackUp)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPokemons())
  }, [change]);

  console.log('pokeBackUp: ', pokeBackUp);
  console.log('pokemons: ', pokemons);

  return (
    <div>
      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon, i) => (
          <Card
            key={i}
            name={pokemon.name}
            img={pokemon.sprites}
            id={pokemon.id}
            types={pokemon.types}
          />
        ))
      ) : (
        <h3>Please add pokemons to display them here</h3>
      )}
    </div>
  );
}
