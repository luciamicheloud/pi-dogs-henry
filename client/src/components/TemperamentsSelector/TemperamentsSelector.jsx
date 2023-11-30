import './TemperamentsSelector.css';
import React, { useState } from 'react';
import Options from "../temperamentsOptions/TemperamentsOptions";

function TemperamentsSelector({ handleFilterByTemperament, temperaments }) {
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const handleSelect = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);

    setSelectedTemperaments(selectedValues);
    handleFilterByTemperament(selectedValues);
  };

  
  return (
    <div>
      <div>
        <label htmlFor="temperamentSelector">Select Temperaments:</label>
        <Options
          props={temperaments}
          onChange={handleSelect}
          value={selectedTemperaments}
          multiple
        />
  
        {selectedTemperaments.length > 0 && (
          <div>
            <span>Selected Temperaments:</span>
            {selectedTemperaments.map((temp) => (
              <div key={temp}>
                <span>{temp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );}

export default TemperamentsSelector;
