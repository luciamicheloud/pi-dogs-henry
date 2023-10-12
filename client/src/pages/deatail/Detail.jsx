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
      <h1 className="card-container-font-title">{dog[0].name}</h1>
      <div className="card-container">
        <img src={dog[0].image} alt={dog[0].name} />
        <p>ID: {dog[0].id}</p>
        <p>height: {dog[0].height} cm.</p>
        <p>weight: {dog[0].weight} kg.</p>
        <p>temperaments: {dog[0].temperaments.map((temp)=> temp.name).join(", ")}</p>
        <p>Años de vida: {dog[0].life_span}</p>
      </div>
      <Link to="/home">Volver al inicio</Link>
    </div>
  );
}

export default Detail;
