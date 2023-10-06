import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../components/navBar/NavBar";
import CreateDogForm from "../../components/createForm/CreateForm";
import { getTemperament } from "../../redux/actions/actions";
import './Create.css';

function Create() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);

  return (
    <div className="create-container">
      <Navbar />
      <h1>Create your breed</h1>
      <CreateDogForm props={temperaments} />
      <button>
        <Link to="/home">Home</Link>
      </button>
    </div>
  );
}

export default Create;