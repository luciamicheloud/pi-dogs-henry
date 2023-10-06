

function Pagination({
  handlePreviousPage,
  handleNextPage,
  currentPage,
  allDogs,
  itemsPerPage,
}) {
  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="span-number">{currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(allDogs.length / itemsPerPage)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;