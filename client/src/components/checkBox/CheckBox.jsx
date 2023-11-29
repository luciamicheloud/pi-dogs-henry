import './CheckBox.css';
import React from 'react';
import Option from "../../components/temperamentsOptions/TemperamentsOptions";

function CheckBox({  handleFilterByTemperament,  temperaments
}){

  return (
    // <div className="checkBox-container">
    //   {props.map((temp) => (
    //     <div key={temp.id}>
    //       <label htmlFor={temp.name}>{temp.name}</label>
    //       <input
    //         type="checkbox"

    //         name={temp.name}
    //         onChange={handleCheck}
    //       />
    //     </div>
    //   ))}
    // </div>

    <div>
      <Option className="checkBox-container" props={temperaments} handleFilter={handleFilterByTemperament} />
    </div>
  );
}

export default CheckBox;
