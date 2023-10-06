import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDogs,
  getDogByname,
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


function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);

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
    dispatch(getDogByname(input));
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

  const handleOrdername = (event) => {
    event.preventDefault();
    dispatch(ordernameCards(event.target.value));
  };

  const handleOrderWeight = (event) => {
    event.preventDefault();
    dispatch(orderWeightCards(event.target.value));
  };

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

  return (
    <div className="body-container">
      <Navbar />
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAll={handleAll}
        input={input}
      />
      <h1>Dogs gallery</h1>
      <Filter
        handleOrderWeight={handleOrderWeight}
        handleOrdername={handleOrdername}
        handleFilterByHosted={handleFilterByHosted}
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
      />
    </div>
  );
}

export default Home;