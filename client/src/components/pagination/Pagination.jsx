function Pagination({
  handlePreviousPage,
  handleNextPage,
  currentPage,
  allDogs,
  itemsPerPage,
  totalPages,
}) {
  return (
    <div className="pagination">
      <p onClick={handlePreviousPage} disabled={currentPage === 1}>
        {"<"}
      </p>
      <span className="span-number">{currentPage}/{totalPages}</span>
      <p
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(allDogs.length / itemsPerPage)}
      >
        {">"}
      </p>
    </div>
  );
}

export default Pagination;