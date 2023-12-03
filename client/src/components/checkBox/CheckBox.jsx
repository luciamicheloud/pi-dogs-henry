import React, { useState } from 'react';
import './CheckBox.css';

function CheckBox({ props, handleCheck }) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(props.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProps = props.slice(startIndex, endIndex);

  return (
    <div>
    <div className="checkBox-container">
      {visibleProps.map((temp) => (
        <div key={temp.id}>
          <label htmlFor={temp.name}>{temp.name}</label>
          <input
            type="checkbox"
            name={temp.name}
            onChange={handleCheck}
          />
        </div>
      ))}
    </div>
      <div className="pagination">
        <p onClick={handlePrevPage}>{"<"}</p>
        <span>{`${currentPage + 1} / ${totalPages}`}</span>
        <p onClick={handleNextPage}>{">"}</p>
      </div>
    </div>
  );
}

export default CheckBox;
