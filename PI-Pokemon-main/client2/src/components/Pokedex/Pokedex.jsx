import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../Redux/actions";
import Card from "../Card/Card";
import styles from './Pokedex.module.css'

export default function Pokedex() {
  const pokemons = useSelector((state) => state.pokeCards);
  const change = useSelector((state) => state.change);
  const types = useSelector((state) => state.types)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (change === true || pokemons.length === 0) dispatch(getPokemons())
    dispatch(getTypes())
  }, [change]);

  return (
    <div className={styles.container} >
      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon, i) => (
          <Card
            key={i}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
            types={pokemon.Types}
            showButton={true}
            disableLink={false}
          />
        ))
      ) : (
        <div className={styles.textContainer} >
        <h3 className={styles.text} >Please add pokemons to display them here</h3>
        </div>
      )}
    </div>
  );
}
