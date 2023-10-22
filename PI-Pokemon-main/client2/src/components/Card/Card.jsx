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

// se pone la primera letra del nombre del pokemon en mayusculas
  if (name) { 
    const slice = name.slice(1);
    const upper = name.charAt(0).toUpperCase();
    name = upper + slice;
  }

// se cambia entre el formato de preview del form y la vista de la card en pokedex
  const containerStyle = disableLink ? styles.container2 : styles.container; 

  // useEffect(() => {
  //   console.log(types);
  // }, [types]);

  const dispatch = useDispatch();

  return (
    <div className={containerStyle}> 
      <div className={styles.div}>
        <h3 className={styles.name}>{name && name}</h3>
        {showButton ? ( // desde el form se posiciona en false, lo que hace que el boton cierre la vista de preview
          <button
            className={styles.button}
            onClick={() => dispatch(delPokemon(id))}
          >
            X
          </button>
        ) : (
          <button className={styles.button} onClick={() => setPreview(false)}>
            X
          </button>
        )}
      </div>
      {disableLink ? ( // el form desactiva el link y lo cambia por un div para prevenir bugs
        <div>
          <div className={styles.imgDiv}>
          {image && <img
            className={styles.img}
            src={image && image}
            alt={"pokemon sprite"}
          />}
          </div>
          <div className={styles.types}>
            {types.length > 0 // se hace un map para renderizar los types si estos existen
              ? types.map((e, i) => (
                  <ul className={styles.type} key={i}>
                    {e && e.toUpperCase()}
                  </ul>
                ))
              : null}
          </div>
        </div>
      ) : ( //si la card se renderiza en pokedex se mostrará el link para que sea posible entrar al detalle
        <Link className={styles.link} to={`/detail/${id}`}>
          <img
            className={styles.img}
            src={image && image}
            alt={"pokemon sprite"}
          />
          <div className={styles.types}>
            {types && types.length > 0
              ? types.map((e, i) => (
                  <ul className={styles.type} key={i}>
                    {" "}
                    {e.name.toUpperCase()}
                  </ul>
                ))
              : null}
          </div>
        </Link>
      )}
    </div>
  );
}
