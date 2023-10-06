import './CheckBox.css';

function CheckBox({ props, handleCheck }) {
  return (
    <div className="checkBox-container">
      {props.map((temp) => (
        <div>
          <label htmlFor={temp.name}>{temp.name}</label>
          <input
            type="checkbox"
            id={temp.name}
            name={temp.name}
            onChange={handleCheck}
          />
        </div>
      ))}
    </div>
  );
}

export default CheckBox;