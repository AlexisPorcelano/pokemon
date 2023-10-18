import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/actions";

export default function Detail() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);

  const { id } = useParams();
  const parsedId = parseInt(id);

  useEffect(() => {
    console.log(parsedId);
    dispatch(getDetail(parsedId));
  }, [parsedId]);

  if (pokemon && pokemon.name) {
    const slice = pokemon.name.slice(1);
    const upper = pokemon.name.charAt(0).toUpperCase();
    pokemon.name = upper + slice;
  }

  return (
    <div>
      <Link to={"/pokedex"}>Back</Link>
      <h1> Name: {pokemon.name && pokemon.name}</h1>
      <img
        src={pokemon.sprites && pokemon.sprites.front_default}
        alt="sprite"
      />
      <h3>
        Types:
        {pokemon.types && pokemon.types.length > 0
          ? pokemon.types.map((e, i) => <h4 key={i}>{e.type.name}</h4>)
          : null}
      </h3>
      <h3>Height: {pokemon.height && pokemon.height} Ft.</h3>
      <h3>Weight: {pokemon.weight && pokemon.weight} Lbs.</h3>
    </div>
  );
}
