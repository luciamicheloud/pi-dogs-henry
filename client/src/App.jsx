import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import './App.css'
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Detail from "./pages/deatail/Detail";
import Create from "./pages/create/Create";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="body-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
  </div>
  )
}

export default App
