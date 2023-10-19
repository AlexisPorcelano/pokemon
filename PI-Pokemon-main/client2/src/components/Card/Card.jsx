import { useDispatch } from "react-redux";
import { delPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";

export default function Card({ name, image, id, types }) {
  //   console.log("pokemon: ", name, "type: ", types);

  if (name) {
    const slice = name.slice(1);
    const upper = name.charAt(0).toUpperCase();
    name = upper + slice;
  }

  const dispatch = useDispatch();

  return (
    <div id={id}>
      <button onClick={() => dispatch(delPokemon(id))}>X</button>
      <h2>Name: {name && name}</h2>
      <Link to={`/detail/${id}`}>
        <img src={image && image} alt={"pokemon sprite"} />
        <h3>
          Types:
          {types && types.length > 0
            ? types.map((e, i) => <h3 key={i}>{e.type.name}</h3>)
            : null}
        </h3>
      </Link>
    </div>
  );
}
