import styles from './Welcome.module.css'
import pokelogo from './pokelogo.png'
import pokedexImage from './pokedex.png'

export default function Welcome() {
  return (
    <div className={styles.container} >
      <img className={styles.logo} src={pokelogo} alt="" />
      <img className={styles.image} src={pokedexImage} alt="" />
    </div>
  );
}
