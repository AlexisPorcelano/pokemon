import { useDispatch } from "react-redux";
import { delPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Card.module.css";

export default function Card({
  name,
  image,
  id,
  types,
  showButton,
  disableLink,
  setPreview,
}) {
  //   console.log("pokemon: ", name, "type: ", types);

  if (name) {
    const slice = name.slice(1);
    const upper = name.charAt(0).toUpperCase();
    name = upper + slice;
  }

  useEffect(() => {
    console.log(types);
  }, [types]);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.div} >
      <h3 className={styles.name}>{name && name}</h3>
      {showButton ? (
        <button
          className={styles.button}
          onClick={() => dispatch(delPokemon(id))}
        >
          X
        </button>
      ) : (
        <button onClick={() => setPreview(false)}>X</button>
      )}
      </div>
      {disableLink ? (
        <div>
          <img
            className={styles.img}
            src={image && image}
            alt={"pokemon sprite"}
          />
          {types.length > 0
            ? types.map((e, i) => <ul className={styles.type} key={i}> {e.name.toUpperCase()}</ul>)
            : null}
        </div>
      ) : (
        <Link className={styles.link} to={`/detail/${id}`}>
          <img
            className={styles.img}
            src={image && image}
            alt={"pokemon sprite"}
          />
          <div className={styles.types}>
            {types && types.length > 0
              ? types.map((e, i) => <ul className={styles.type} key={i}> {e.name.toUpperCase()}</ul>)
              : null}
          </div>
        </Link>
      )}
    </div>
  );
}
