import { NavLink } from "react-router-dom";
import logoDoggies from "../../assets/logoDoggies.png";
import "./navBar.css";


function Navbar() {
  return (
    <div className="navBar-container">
      <ul>
        <li>
          <NavLink to="/">
            <img className="logo" alt="dog-head" src={logoDoggies} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "#f5a5c2" : "white",
              };
            }}
          >
            <h2>Home</h2>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "#f5a5c2" : "white",
              };
            }}
          >
            <h2>Create</h2>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;