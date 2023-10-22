import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/actions";
import fillerImg from "./team.png";
import styles from "./Detail.module.css";

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
    <div className={styles.container}>
      <img className={styles.filler} src={fillerImg} alt="" />
      <Link className={styles.linkBack} to={"/pokedex"}>
        Back
      </Link>
      <img
        className={styles.img}
        src={pokemon.image && pokemon.image}
        alt="sprite"
      />
      <div className={styles.innerContainer}>
        <div>
          <h2 className={styles.name}>{pokemon.name && pokemon.name}</h2>
        </div>
        <div className={styles.typesContainer}>
          {pokemon.Types && pokemon.Types.length > 0
            ? pokemon.Types.map((e, i) => (
                <h4 className={styles.type} key={i}>
                  {e && e.name.toUpperCase()}
                </h4>
              ))
            : null}
        </div>
        <div className={styles.allStats}>
          <ul className={styles.statItem}>
            HP: {pokemon.health && pokemon.health}
          </ul>
          <ul className={styles.statItem}>
            ATK: {pokemon.attack && pokemon.attack}
          </ul>
          <ul className={styles.statItem}>
            DEF: {pokemon.defense && pokemon.defense}
          </ul>
          <ul className={styles.statItem}>
            SPD: {pokemon.speed && pokemon.speed}
          </ul>
        </div>
        <div className={styles.measure}>
          <h3>
            Height: {pokemon.height && pokemon.height}
            {" Ft."}
          </h3>
          <h3>
            Weight: {pokemon.weight && pokemon.weight}
            {" Lbs."}
          </h3>
        </div>
      </div>
    </div>
  );
}
