import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, changeAction } from "../../Redux/actions";
import Card from "../Card/Card";
import styles from "./Pokedex.module.css";

export default function Pokedex() {
  const pokeCards = useSelector((state) => state.pokeCards);
  const pokemons = useSelector((state) => state.pokemons);
  const change = useSelector((state) => state.change)
  const page = useSelector((state) => state.page)
  const dispatch = useDispatch();


  useEffect(() => {
    if(change) dispatch(changeAction(false))
    // dispatch(changeAction())
  }, [change])

  useEffect(() => {

    dispatch(getTypes());
    if (pokemons.length === 0) {
      console.log('loading');
      dispatch(getPokemons());
    }
  }, []);

  return (
    <div className={styles.container}>
      {pokeCards && pokeCards.length > 0 ? (
        pokeCards[page - 1].map((pokemon, i) => (
          <Card
            key={i}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
            types={pokemon.Types}
            origin={pokemon.origin}
            showButton={true}
            disableLink={false}
          />
        ))
      ) : (
        <div className={styles.textContainer}>
          <h3 className={styles.text}>
            Please add pokemons to display them here
          </h3>
        </div>
      )}
    </div>
  );
}
