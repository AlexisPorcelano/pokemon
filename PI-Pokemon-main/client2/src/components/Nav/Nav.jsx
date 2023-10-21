import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar'
import styles from './Nav.module.css'
import pokelogo from './pokelogo.png'

export default function Nav(){
    return(
        <div className={styles.Nav} >
            <img className={styles.logo} src={pokelogo} alt="" />
            <Link to={'/submit'} className={styles.link} >Submit new Pokemon</Link>
            <Searchbar/>
        </div>
    )
}