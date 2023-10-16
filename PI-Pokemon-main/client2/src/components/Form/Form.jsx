import { Link } from "react-router-dom"

export default function Form(){
    return(
        <div>
            <Link to={'/pokedex'} >Back</Link>
            <h1>form</h1>
        </div>
    )
}