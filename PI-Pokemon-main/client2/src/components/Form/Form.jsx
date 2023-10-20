import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../../Redux/actions";
import styles from "./Form.module.css";
import FormErrors from "./FormErrors";

export default function Form() {
  const typesList = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [twoTypes, setTwoTypes] = useState(false)

  const [pokeData, setPokeData] = useState({
    name: "",
    image: "",
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPokeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeSelect = (event) => {
    const { name, value } = event.target;
    setPokeData((prevData) => ({
      ...prevData,
      types: [...prevData.types, value],
    }));
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleSubmit = () => {
    console.log(pokeData);
  }

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
          <select
            name="type1"
            onChange={handleTypeSelect}
            className={styles.Select}
          >
            {typesList && typesList.length > 0
              ? typesList.map((type, i) => (
                  <option key={i} value={type.name}>
                    {type.name}
                  </option>
                ))
              : null}
          </select>
          <select
            name="type2"
            onChange={handleTypeSelect}
            className={styles.Select}
          >
            {typesList && typesList.length > 0
              ? typesList.map((type, i) => (
                  <option key={i} value={type.name}>
                    {type.name}
                  </option>
                ))
              : null}
          </select>

          <FormErrors pokeData={pokeData} />

          <button className={styles.button} onClick={()=> handleSubmit()} >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
