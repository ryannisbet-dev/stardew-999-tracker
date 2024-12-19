import React from 'react';
import { Link } from 'react-router-dom';
import './header.less'

function Header() {
  return (
    <header className="header">
      <h1>Stardew 999 Tracker - Ryan's a bell</h1>
      <nav className="nav">
        <Link className="nav_item" to="/fruits">Fruits</Link>
        <Link className="nav_item" to="/veggies">Veggies</Link>
        <Link className="nav_item" to="/geodes">Geodes</Link>
        <Link className="nav_item" to="/flowers">Flowers</Link>
      </nav>
    </header>
  );
}

export default Header;