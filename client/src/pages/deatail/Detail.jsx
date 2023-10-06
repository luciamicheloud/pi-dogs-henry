import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions/actions";

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
      <h1>{dog[0].name}</h1>
      <div>
        <img src={dog[0].imagen} alt={dog[0].name} />
        <p>ID: {dog[0].id}</p>
        <p>Altura: {dog[0].altura} cm.</p>
        <p>Peso: {dog[0].peso} kg.</p>
        <p>Temperamentos: {dog[0].temperamentos}</p>
        <p>Años de vida: {dog[0].añosDeVida}</p>
      </div>
      <Link to="/home">Volver al inicio</Link>
    </div>
  );
}

export default Detail;
