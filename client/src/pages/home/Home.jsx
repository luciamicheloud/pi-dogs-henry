import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDogs,
  getDogByName,
  getTemperament,
  filterCards,
  ordernameCards,
  orderWeightCards,
  filterByHosted,
} from "../../redux/actions/actions";

import Filter from "../../components/filter/Filter";
import Cards from "../../components/cards/Cards";
import Navbar from "../../components/navBar/NavBar";
import SearchBar from "../../components/searchBar/SearchBar";
import Pagination from "../../components/pagination/Pagination";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  //paginado
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(allDogs.length / itemsPerPage);
  
  //filtros
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState("");
  
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);
  
  //paginado
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(allDogs.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevStatus) => prevStatus + 1);
    }
  };


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament());
  }, [dispatch]);

  const resetPag = () => {
    setCurrentPage(1);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDogByName(input));
    resetPag();
  };

  const handleAll = (event) => {
    event.preventDefault();
    dispatch(getDogs());
    setInput("");
  };

  const handleFilter = (event) => {
    event.preventDefault();
    dispatch(filterCards(event.target.value));
    resetPag();
  };

  const handleFilterByHosted = (event) => {
    event.preventDefault();
    dispatch(filterByHosted(event.target.value));
    resetPag();
  };

  const handleFilterByTemperament = (event) => {
    event.preventDefault();
    dispatch(filterCards(event.target.value));
    resetPag();
  };

  const handleOrdername = (event) => {
    event.preventDefault();
    dispatch(ordernameCards(event.target.value));
  };

  const handleOrderWeight = (event) => {
    event.preventDefault();
    dispatch(orderWeightCards(event.target.value));
  };


  return (
    <div className="body-container">
      <Navbar />
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAll={handleAll}
        input={input}
      />
      <Filter
        handleOrderWeight={handleOrderWeight}
        handleOrdername={handleOrdername}
        handleFilterByHosted={handleFilterByHosted}
        handleFilterByTemperament={handleFilterByTemperament}
        temperaments={temperaments}
        handleFilter={handleFilter}
      />
      <Cards props={currentItems} />
      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        allDogs={allDogs}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Home;