import styles from "./Welcome.module.css";
import pokelogo from "./pokelogo.png";
import pokedexImage from "./pokedex.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemons, getTypes } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import loading from "./loading.gif";
import axios from "axios";

export default function Welcome() {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.change);
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const types = await axios.get("http://localhost:3001/types");
        const response = await axios.get("http://localhost:3001/pokemons");
        if (response.data) {
          setLoaded(true);
        }
      } catch (error) {
        window.alert(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={pokelogo} alt="" />
      <img className={styles.image} src={pokedexImage} alt="" />
      {loaded ? (
        <button
          className={styles.button1}
          onClick={() => {
            navigate("/pokedex");
          }}
        >
          PLAY
        </button>
      ) : (
        <img className={styles.loading} src={loading} alt="" />
      )}
    </div>
  );
}
