import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    // { name: 'Services', path: '/services' },
    // { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Logo</div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
  {navItems.map((item) => (
    <Link 
      key={item.name} 
      to={item.path} 
      className="nav-link"
      onClick={() => setIsMenuOpen(false)}
    >
      {item.name}
    </Link>
  ))}
</div>
        
        <button 
          className="hamburger-menu" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;