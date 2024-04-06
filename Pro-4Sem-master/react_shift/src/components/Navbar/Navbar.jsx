import { NavLink } from "react-router-dom";
import './Navbar.css';

export default function Navbar(){
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
              <NavLink to="/">Home</NavLink>
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
          <button>Connect Wallet</button>
        </div>
      </nav>
    );
}
