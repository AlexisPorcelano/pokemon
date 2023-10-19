import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../Redux/actions";
import Card from "../Card/Card";

export default function Pokedex() {
  const pokemons = useSelector((state) => state.pokemons);
  const change = useSelector((state) => state.change);
  const types = useSelector((state) => state.types)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (change === true || pokemons.length === 0) dispatch(getPokemons())
    dispatch(getTypes())
  }, [change]);

  return (
    <div>
      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon, i) => (
          <Card
            key={i}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
            types={pokemon.Types}
          />
        ))
      ) : (
        <h3>Please add pokemons to display them here</h3>
      )}
    </div>
  );
}
