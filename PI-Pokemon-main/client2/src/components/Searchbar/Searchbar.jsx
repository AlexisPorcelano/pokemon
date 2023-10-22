import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPokemon } from "../../Redux/actions";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(addPokemon(name));
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
