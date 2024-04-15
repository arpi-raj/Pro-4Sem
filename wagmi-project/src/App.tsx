import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
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
