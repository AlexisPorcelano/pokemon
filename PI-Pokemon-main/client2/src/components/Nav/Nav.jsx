import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import styles from "./Nav.module.css";
import pokelogo from "./pokelogo.png";
import OrderFilter from "../OrderFilter/OrderFilter";
import { useDispatch } from "react-redux";
import { getAll, getPokemons } from "../../Redux/actions";
import { useState } from "react";

export default function Nav() {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={styles.Nav}>
      {/* <button type="button " onClick={() => dispatch(getAll)}></button> */}
      <img className={styles.logo} src={pokelogo} alt="" />
      <Link to={"/submit"} className={styles.link}>
        CREATE POKEMON
      </Link>
      <Searchbar />
      <button className={styles.button2} type="button" onClick={() => dispatch(getPokemons())}>Reset</button>
      {showFilters ? (
        <OrderFilter
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      ) : (
        <div className={styles.container2} >
          <button
            className={styles.button}
            type="button"
            onClick={() => setShowFilters(true)}
          >
            SHOW FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
