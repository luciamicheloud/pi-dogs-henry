import Option from "../../components/temperamentsOptions/TemperamentsOptions";

function Filter({
  handleOrderWeight,
  handleOrdername,
  handleFilterByHosted,
  temperaments,
  handleFilter,
}) {
  return (
    <div className="filter-container">
      <select onChange={handleOrderWeight}>
        <option>Order Weight</option>
        <option value="A">Ascendent</option>
        <option value="D">Descendent</option>
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
      <Option props={temperaments} handleFilter={handleFilter} />
    </div>
  );
}

export default Filter;