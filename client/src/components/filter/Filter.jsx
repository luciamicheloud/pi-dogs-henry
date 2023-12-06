import React from 'react';
import Option from "../../components/temperamentsOptions/TemperamentsOptions";
import "./Filter.css";
function Filter({
  handleOrderWeight,
  handleOrdername,
  handleFilterByHosted,
  handleFilterByTemperament,
  temperaments,
}) {
  return (
    <div className="filter-container">
      <select onChange={handleOrderWeight}>
        <option>Order Weight</option>
        <option name="pesoMayor">Ascendent</option>
        <option name="pesoMenor">Descendent</option>
      </select>
      <select onChange={handleOrdername}>
        <option>Order name</option>
        <option value="A">Ascendent</option>
        <option value="D">Descendent</option>
      </select>
      <select onChange={handleFilterByHosted}>
        <option>Host</option>
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>
      <Option props={temperaments} handleFilter={handleFilterByTemperament} />
    </div>
  );
}

export default Filter;
