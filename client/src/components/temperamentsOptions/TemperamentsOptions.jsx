function Options({ props, handleFilter }) {
    return (
      <select onChange={handleFilter}>
        <option>
          Temperaments
        </option>
  
        {props.map((temp) => (
          <option value={temp.name} key={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
    );
  }
  
  export default Options;