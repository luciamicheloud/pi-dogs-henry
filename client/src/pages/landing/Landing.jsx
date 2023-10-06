import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome to Doggies</h1>
      <button>
        <Link to="/home">Let's start!</Link>
      </button>
    </div>
  );
}

export default Landing;