import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Stardew 999 Tracker</h1>
      <nav>
        <Link to="/fruits">Fruits</Link>
        <Link to="/veggies">Veggies</Link>
      </nav>
    </header>
  );
}

export default Header;