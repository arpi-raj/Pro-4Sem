import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/start/registration" element={<Registration />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
