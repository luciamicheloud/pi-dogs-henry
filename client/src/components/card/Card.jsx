import { Link } from "react-router-dom";
import './Card.css';

function Card({ dog }) {
  const name = dog.name || "";

  return (
    <div className="card-container-c" key={dog.id}>
      <h2>{name.toUpperCase()}</h2>

      <div>
        <Link to={`/home/${dog.id}`}>
          <img src={dog.image?.url || dog.image} alt="image not found" />
        </Link>
      </div>
      <h3 className="card-container-c-body-font">
        TEMPERAMENT: {dog.temperaments}
      </h3>
      <h3 className="card-container-c-body-font">
        WEIGHT: {dog.weight} kg.
      </h3>
    </div>
  );
}

export default Card;
