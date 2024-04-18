import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Vote from './components/Vote/Vote';
import React from "react";
import { Web3ModalProvider } from "./Web3ModalProvider";


function App() {

  return (
    <Web3ModalProvider>

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Admin />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
    </Web3ModalProvider>

  )
}

export default App
