import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { ConnectKitButton } from "connectkit";
import "./Navbar.css";

export default function Navbar() {
  const [address, setAddress] = useState("0x00000000000000");
  const [connect, setConnect] = useState(false);

  async function connectWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const _address = await signer.getAddress();
    setAddress(_address);
    console.log(_address);
    setConnect(true);
  }
  return (
    <nav className="main-nav">
      <div className="logo">
        <NavLink to="/">
          <h2>DeVo</h2>
        </NavLink>
      </div>
      <div className="header-content">
        <ul>
          <li>
            <NavLink to="/" state={{ addrs: address }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/start/registration">Reg</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
      <div className="connect-button">
      <ConnectKitButton />

      </div>
    </nav>
  );
}
