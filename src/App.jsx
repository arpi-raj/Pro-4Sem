import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Navbar from './components/Navbar/Navbar';
import Admin from './components/Admin/Admin';
import Vote from './components/Vote/Vote';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Admin />} />
        <Route path="/vote" element={<Vote />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
