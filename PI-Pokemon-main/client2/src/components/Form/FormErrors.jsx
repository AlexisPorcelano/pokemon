import { useEffect, useState } from "react";
import styles from "./FormErrors.module.css";

export default function FormErrors({ pokeData, error, setError }) {
  useEffect(() => {
    console.log(error);
    //primero sumamos las estadisticas del pokemon
    const statSum =
      parseInt(pokeData.health) +
      parseInt(pokeData.attack) +
      parseInt(pokeData.defense) +
      parseInt(pokeData.speed) +
      parseInt(pokeData.weight) +
      parseInt(pokeData.height);
    if (containsNumbers(pokeData.name)) {
      //si el nombre contiene numeros
      setError("Name cannot contain numbers");
    } else if (pokeData.name.length > 20) {
      //si el nombre supera los 20 caracteres
      setError("Name must be under 20 characters");
    } else if (pokeData.name.length < 3) {
      //si el nombre no supera los 3 caracteres
      setError("Name must be over 3 characters");
    } else if (statSum > 700) {
      // si la suma de las estadisticas es mayor a 700
      setError("The total stats must be below 700 points");
    } else if (pokeData.image === "") {
      // si no se insertó una imagen
      setError("Must contain an image");
    } else if (statSum < 175) {
      // si la suma de las estadisticas es menor a 175
      setError("The total stats must be over 175 points");
    } else if (isNaN(statSum)) {
      //si la suma de las estadisticas es NaN querría decir que se están ingresando caracteres no numericos
      setError("Stats must be numeric values");
    } else if (pokeData.types[0] === pokeData.types[1]) {
      //si los types son iguales
      setError("Types cannot be the same");
    } else {
      setError("All good to go");
    }
  }, [pokeData]);

  function containsNumbers(name) {
    //la funcion que permite comprobar que name no contenga numeros
    for (let i = 0; i < name.length; i++) {
      const charCode = name.charCodeAt(i);
      if (charCode >= 48 && charCode <= 57) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className={styles.container}>
      {error !== 'All good to go' ? (
        <h4 className={styles.errors}>{error}</h4>
      ) : (
        <h4 className={styles.noErrors} >All good to go</h4>
      )}
    </div>
  );
}
