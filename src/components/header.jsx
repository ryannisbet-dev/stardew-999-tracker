import React from 'react';
import { Link } from 'react-router-dom';
import './header.less'

function Header() {
  return (
    <header className="header">
      <h1>Stardew Valley - 999 Tracker</h1>
      <nav className="nav">
        <Link className="nav_item" to="/animalproducts">Animal Products</Link>
        <Link className="nav_item" to="/artisangoodsjar">Artisan Goods - Jar</Link>
        <Link className="nav_item" to="/artisangoodskeg">Artisan Goods - Keg</Link>
        <Link className="nav_item" to="/bait">Bait</Link>
        <Link className="nav_item" to="/fertilizer">Fertilizer</Link>
        <Link className="nav_item" to="/fish">Fish</Link>
        <Link className="nav_item" to="/flowers">Flowers</Link>
        <Link className="nav_item" to="/forage">Forage</Link>
        <Link className="nav_item" to="/fruits">Fruits</Link>
        <Link className="nav_item" to="/gems">Gems</Link>
        <Link className="nav_item" to="/geodes">Geodes</Link>
        <Link className="nav_item" to="/minerals">Minerals</Link>
        <Link className="nav_item" to="/monsterdrops">Monster Drops</Link>
        <Link className="nav_item" to="/resources">Resources</Link>
        <Link className="nav_item" to="/roe">Roe</Link>
        <Link className="nav_item" to="/seeds">Seeds</Link>
        <Link className="nav_item" to="/smokedfish">Smoked Fish</Link>
        <Link className="nav_item" to="/veggies">Veggies</Link>
        
      </nav>
    </header>
  );
}

export default Header;