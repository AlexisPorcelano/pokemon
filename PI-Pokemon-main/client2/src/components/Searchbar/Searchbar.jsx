import axios from "axios";
import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { addPokemon } from "../../Redux/actions";
import styles from './Searchbar.module.css'

export default function Searchbar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch()

  const onSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${name}`);
      if (response.data) {
        dispatch(addPokemon(response.data))
        setName("")
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleInputChange = (event) => {
    let searchName = event.target.value
    let lowerCased = searchName.toLowerCase()
    setName(lowerCased);
  };

  return (
    <div className={styles.container} >
      <input
        type="text"
        placeholder="Search Pokemon"
        value={name}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button className={styles.button} onClick={onSearch}>Search</button>
    </div>
  );
}
