import './CheckBox.css';

function CheckBox({ props, handleCheck }) {
  return (
    <div className="checkBox-container">
      {props.map((temp) => (
        <div key={temp.id}>
          <label htmlFor={temp.name}>{temp.name}</label>
          <input
            type="checkbox"
            id={temp.id}
            name={temp.name}
            onChange={handleCheck}
          />
        </div>
      ))}
    </div>
  );
}

export default CheckBox;
