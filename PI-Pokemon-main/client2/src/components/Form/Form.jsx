import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../Redux/actions";
import styles from "./Form.module.css";
import FormErrors from "./FormErrors";
import axios from "axios";
import Card from "../Card/Card";
import eevelutions from "./eevelutions.png"

export default function Form() {
  const typesList = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [twoTypes, setTwoTypes] = useState(false);
  const [preview, setPreview] = useState(false);

  const [pokeData, setPokeData] = useState({
    name: "",
    image: "",
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: ["normal", null],
  });

  const reset = () => {
    setPokeData({
      name: "",
      image: "",
      health: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: ["normal", null],
    });
    setTwoTypes(false);
    setPreview(false);
  };

  const [error, setError] = useState("");

  useEffect(() => {
    //se cargan los types desde la database
    dispatch(getTypes());
  }, []);

  const handleChange = (event) => {
    //se controla el formulario
    const { name, value } = event.target;
    setPokeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeSelect = (event) => {
    //se controlan los types
    const { name, value } = event.target;

    if (name === "type1") {
      // si es la primera casilla se cambiará solo el primer espacio de types
      setPokeData((prevData) => ({
        ...prevData,
        types: [value, prevData.types[1]],
      }));
    } else if (name === "type2") {
      //si es la segunda casilla se cambiará solo el segundo espacio de types
      setPokeData((prevData) => ({
        ...prevData,
        types: [prevData.types[0], value],
      }));
    }
  };

  const handleTwoTypes = (boolean) => {
    if (boolean) {
      // si es true se renderiza un segundo select y se setea el segundo type en normal
      setTwoTypes(true);
      setPokeData((prevData) => ({
        ...prevData,
        types: [prevData.types[0], "normal"],
      }));
    }
    if (!boolean) {
      // si es false se oculta el segundo select y se setea el segundo type en null
      setTwoTypes(false);
      setPokeData((prevData) => ({
        ...prevData,
        types: [prevData.types[0], null],
      }));
    }
  };

  useEffect(() => {
    console.log(pokeData);
  }, [pokeData]);

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  const handleSubmit = async () => {
    // se envia la data a la database
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        pokeData
      );
      reset()
      window.alert('Succesfuly created pokemon')
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Link to={"/pokedex"} className={styles.linkBack}>
        Back
      </Link>
      <form className={styles.Form}>
        <div className={styles.Div}>
          <label htmlFor="name" className={styles.Label}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={pokeData.name}
            onChange={handleChange}
            className={styles.Name}
          />
          <label htmlFor="image" className={styles.Label}>
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            value={pokeData.image}
            onChange={handleChange}
            className={styles.Name}
          />
        </div>
        <div className={styles.Div}>
          <label htmlFor="health" className={styles.Label}>
            Health:
          </label>
          <input
            type="text"
            name="health"
            value={pokeData.health}
            onChange={handleChange}
            className={styles.Input}
          />
          <label htmlFor="attack" className={styles.Label}>
            Attack:
          </label>
          <input
            type="text"
            name="attack"
            value={pokeData.attack}
            onChange={handleChange}
            className={styles.Input}
          />
          <label htmlFor="defense" className={styles.Label}>
            Defense:
          </label>
          <input
            type="text"
            name="defense"
            value={pokeData.defense}
            onChange={handleChange}
            className={styles.Input}
          />
        </div>
        <div className={styles.Div}>
          <label htmlFor="speed" className={styles.Label}>
            Speed:
          </label>
          <input
            type="text"
            name="speed"
            value={pokeData.speed}
            onChange={handleChange}
            className={styles.Input}
          />
          <label htmlFor="height" className={styles.Label}>
            Height:
          </label>
          <input
            type="text"
            name="height"
            value={pokeData.height}
            onChange={handleChange}
            className={styles.Input}
          />
          <label htmlFor="weight" className={styles.Label}>
            Weight:
          </label>
          <input
            type="text"
            name="weight"
            value={pokeData.weight}
            onChange={handleChange}
            className={styles.Input}
          />
        </div>
        <div className={styles.Div2}>
          <label htmlFor="types" className={styles.Label}>
            Types:
          </label>
          <div className={styles.Div1}>
            <select
              name="type1"
              onChange={handleTypeSelect}
              className={styles.Select}
            >
              {typesList && typesList.length > 0 // si se cargaron los types desde la database se crearan los selects
                ? typesList.map(
                    (
                      type,
                      i // cada select tiene la opction de un type cargado de la database
                    ) => (
                      <option key={i} value={type.name}>
                        {type.name}
                      </option>
                    )
                  )
                : null}
            </select>
          </div>
          {twoTypes ? ( // si se presiona el boton para añadir un segundo type el boton se cambia por un nuevo select
            <>
              <select
                name="type2"
                onChange={handleTypeSelect}
                className={styles.Select}
              >
                {typesList && typesList.length > 0 //este nuevo select tiene su propio name para cambiar los types independientemente del otro
                  ? typesList.map((type, i) => (
                      <option key={i} value={type.name}>
                        {type.name}
                      </option>
                    ))
                  : null}
              </select>
              <button
                className={styles.button} // aparece un nuevo boton para ocultar el segundo select
                onClick={() => handleTwoTypes(false)}
              >
                -
              </button>
            </>
          ) : (
            // este es el boton que aparece en lugar del select cuando está oculto
            <button
              className={styles.button}
              onClick={() => handleTwoTypes(true)}
            >
              +
            </button>
          )}

          <FormErrors /*formErrors se ocupa de controlar que la data del formulario sea correcta*/
            error={error}
            setError={setError}
            pokeData={pokeData}
          />
          {error === "All good to go" ? (
            <button type="button" className={styles.submit} onClick={() => handleSubmit()}>
              Submit
            </button>
          ) : (<button type="button" className={styles.submit} onClick={() => window.alert(error)} >Submit</button>)}
          <button type="button" onClick={() => reset()} className={styles.reset}>
            Reset
          </button>
        </div>
      </form>
      <div>
        {preview ? ( // si se presiona el boton de preview se renderizará una card con la info del form
          <Card
            name={pokeData.name}
            image={pokeData.image}
            types={pokeData.types}
            showButton={false}
            disableLink={true}
            setPreview={setPreview}
          />
        ) : (
          // si se oculta la preview card se renderizará el botón que permite verla de nuevo
          <button className={styles.preview} onClick={() => setPreview(true)}>
            Click to display card preview
          </button>
        )}
      </div>
      <img className={styles.eevelutions} src={eevelutions} alt="" />
    </div>
  );
}
