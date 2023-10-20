import { useEffect, useState } from "react";
import styles from "./FormErrors.module.css";

export default function FormErrors({ pokeData }) {
  const [error, setError] = useState("");

  useEffect(() => {
    const statSum =
      parseInt(pokeData.health) +
      parseInt(pokeData.attack) +
      parseInt(pokeData.defense) +
      parseInt(pokeData.speed) +
      parseInt(pokeData.weight) +
      parseInt(pokeData.height);
    console.log(statSum);

    if (pokeData.name.length > 10) {
      setError("Name must be under 10 characters");
    } else if (pokeData.name.length < 4) {
      setError("Name must be over 4 characters");
    } else if (containsNumbers(pokeData.name)) {
      setError("Name cannot contain numbers");
    } else if (statSum > 700) {
      setError("The total stats must be below 700 points");
    } else if (statSum < 175) {
      setError("The total stats must be over 175 points");
    } else if (isNaN(statSum)) {
      setError("Stats must be numeric values");
    } else {
      setError("");
    }
  }, [pokeData]);

  function containsNumbers(name) {
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
      {error.length > 0 ? (
        <h4 className={styles.errors}>{error}</h4>
      ) : (
        <h4 className={styles.noErrors}>All good to go</h4>
      )}
    </div>
  );
}
