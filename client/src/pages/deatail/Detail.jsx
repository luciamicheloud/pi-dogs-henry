import NavBar from "../../components/navBar/NavBar"
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions/actions";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const dog = useSelector((state) => state.dog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  // Verifica si dog está vacío antes de mostrar los datos
  if (Object.keys(dog).length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <NavBar/>
      <div className="card-container">

        <h1>{dog[0].name}</h1>
        
        <div className="data-container">
        <img src={dog[0].image} alt={dog[0].name} />
        
        <div className="text-container">
        <p>ID: {dog[0].id}</p>
        <p>Height: {dog[0].height} cm.</p>
        <p>Weight: {dog[0].weight} kg.</p>
        <p>Temperaments: {dog[0].temperaments.map((temp)=> temp.name).join(", ")}</p>
        <p>Life span: {dog[0].life_span}</p>
        </div>
        </div>

      </div>

      <Link to="/home">{"<- go back"}</Link>

    </div>
  );
}

export default Detail;
