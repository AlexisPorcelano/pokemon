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
      <h2> Name: {pokemon.name && pokemon.name}</h2>
      <img src={pokemon.image && pokemon.image} alt="sprite" />
      <div>
        Types:
        {pokemon.Types && pokemon.Types.length > 0
          ? pokemon.Types.map((e, i) => <h4 key={i}> {e.name}</h4>)
          : null}
      </div>
      <li>
        STATS:
        <lu>HP: {pokemon.health && pokemon.health}</lu>
        <lu>ATK: {pokemon.attack && pokemon.attack}</lu>
        <lu>DEF: {pokemon.defense && pokemon.defense}</lu>
        <lu>SPD: {pokemon.speed && pokemon.speed}</lu>
        <lu>HGT: {pokemon.height && pokemon.height} </lu>
        <lu>WGT: {pokemon.weight && pokemon.weight}</lu>
      </li>
    </div>
  );
}
