import "./SearchBar.css";

function SearchBar({ handleSubmit, handleChange, handleAll, input }) {
    return (
      <div className="search-container">
        <form>
          <input
            placeholder="Search..."
            width="25px"
            onChange={(e) => handleChange(e)}
            value={input}
          />
          <button onClick={handleSubmit}>Search</button>
          <button onClick={handleAll}>All</button>
        </form>
      </div>
    );
  }
  
  export default SearchBar;