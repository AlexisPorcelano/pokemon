import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, search } from "../../Redux/actions";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);

  const onSearch = () => {
    const found = pokemons.some((e) => e.name === name);
    if (found) {
      console.log('pokemon found');
      dispatch(search(name));
    } else {
      return async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/pokemons/${name}`
          );
          if (response.data) {
            dispatch(getPokemons)
            setTimeout(() => {
              dispatch(search(name))
            }, 1000);
          }
        } catch (error) {
          window.alert(error.message);
        }
      };
    }
    setName("");
  };

  const handleInputChange = (event) => {
    let searchName = event.target.value;
    let lowerCased = searchName.toLowerCase();
    setName(lowerCased);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={name}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button className={styles.button} onClick={onSearch}>
        SEARCH
      </button>
    </div>
  );
}
