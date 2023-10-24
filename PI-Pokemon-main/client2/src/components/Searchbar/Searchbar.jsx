import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon } from "../../Redux/actions";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const pokeCards = useSelector((state) => state.backUp);

  const onSearch = () => {
    const found = pokeCards.some((e) => e.name === name);
    if (found) {
      window.alert("Pokemon is already being displayed");
    } else {
      dispatch(addPokemon(name));
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
        Search
      </button>
    </div>
  );
}
