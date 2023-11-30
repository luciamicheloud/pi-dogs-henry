import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postDogs, filterCards } from "../../redux/actions/actions";
import validate from "./validation";
import TemperamentsSelector from "../../components/TemperamentsSelector/TemperamentsSelector";
import "./CreateForm.css"


function CreateDogForm({ props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = props;
  const [currentPage, setCurrentPage] = useState(1);

  const resetPag = () => {
    setCurrentPage(1);
  };
  
  
  const [dogData, setDogData] = useState({
    name: "",
    heightMax: "",
    heightMin: "",
    weightMax: "",
    weightMin: "",
    life_span: "",
    temperaments: [],
    image: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    heightMax: "",
    heightMin: "",
    weightMax: "",
    weightMin: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

const handleSubmit = (event) => {
  event.preventDefault();

  const dogCreated = {
    name: dogData.name,
    height: `${dogData.heightMin} - ${dogData.heightMax}`,
    weight: `${dogData.weightMin} - ${dogData.weightMax}`,
    life_span: `${dogData.life_span} years`,
    temperaments: selectedTemperaments, // Aquí pasamos solo los nombres de los temperamentos
    image: dogData.image,
  };

  if (Object.values(errors).some((error) => error !== "")) {
    return alert("Cannot create dog, missing or invalid data");
  }

  dispatch(postDogs(dogCreated));
  alert("Your dog has been created!!");
  setDogData({
    name: "",
    heightMax: "",
    heightMin: "",
    weightMax: "",
    weightMin: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  navigate("/home");
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate({ ...dogData, [name]: value }, temperaments)[name],
    }));
  };


  const handleFilterByTemperament = (selectedValues) => {
    setSelectedTemperaments(selectedValues);
  };
  

  return (
    <div >
      <form className="form-dog-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={dogData.name}
            onChange={handleInputChange}
          />
          <span>{errors.name}</span>
        </label>
        <br />
        <label>
          Height min(cm):
          <input
            type="text"
            name="heightMin"
            value={dogData.heightMin}
            onChange={handleInputChange}
          />
          <span>{errors.heightMin}</span>
        </label>
        <br />
        <label>
          Height max(cm):
          <input
            type="text"
            name="heightMax"
            value={dogData.heightMax}
            onChange={handleInputChange}
          />
          <span>{errors.heightMax}</span>
        </label>
        <br />
        <label>
          Weight min(kg):
          <input
            type="text"
            name="weightMin"
            value={dogData.weightMin}
            onChange={handleInputChange}
          />
          <span>{errors.weightMin}</span>
        </label>
        <br />
        <label>
          Weight max(kg):
          <input
            type="text"
            name="weightMax"
            value={dogData.weightMax}
            onChange={handleInputChange}
          />
          <span>{errors.weightMax}</span>
        </label>
        <br />
        <label>
          Life Span:
          <input
            type="text"
            name="life_span"
            value={dogData.life_span}
            onChange={handleInputChange}
          />
          <span>{errors.life_span}</span>
        </label>
        <br />
        <label>
        <br />

        <TemperamentsSelector
        handleFilterByTemperament={handleFilterByTemperament}
        temperaments={temperaments}
      />

        <br />
        <span>{errors.temperaments}</span>
            </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={dogData.image}
            onChange={handleInputChange}
          />
          <span>{errors.image}</span>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateDogForm;