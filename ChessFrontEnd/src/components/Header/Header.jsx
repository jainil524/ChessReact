import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '/Logo.jpeg';
import '../../css/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                  <img src={Logo} alt="Chess Logo" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/findroom">Find a Room</Link></li>
                        <li><Link to="/rooms">Create / Join Room</Link></li>
                        <li><Link to="/board">board</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
