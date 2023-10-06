import Card from "../card/Card";
import './Cards.css'

function Cards({ props }) {
  const allDogs = props;
  return (
    <div className="cards-container" key="1">
      {allDogs?.map((dog) => {
        return <Card dog={dog} />;
      })}
    </div>
  );
}

export default Cards;