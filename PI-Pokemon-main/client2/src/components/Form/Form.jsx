import { Link } from "react-router-dom";

export default function Form() {
  return (
    <div>
      <Link to={"/pokedex"}>Back</Link>
      <form action="submit">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />

      </form>
    </div>
  );
}
