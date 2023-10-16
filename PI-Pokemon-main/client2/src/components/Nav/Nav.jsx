import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar'
import styles from './Nav.module.css'

export default function Nav(){
    return(
        <div className={styles.Nav} >
            <Link to={'/submit'} className={styles.link} >Submit new Pokemon</Link>
            <Searchbar/>
        </div>
    )
}