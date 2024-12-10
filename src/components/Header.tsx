import React from 'react';
import "../styles/AppStyles.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="img--banner">
        <div className="overlay"></div>
        <div className="contenido_header">
          <h1 className="titulo--banner">{title}</h1>
          <p className="p">
            Con AgricoTech, predice el futuro y haz más fácil el manejo de tus cosechas,
            sin comprometer el daño climático ni el gasto excesivo de agua.
          </p>
        </div>
      </div>
      <nav className="navbar">
        <div className="logo">
          <h2>AgricoTech</h2>
        </div>
        <ul className="nav-links">
          <li><a href="#about">Sobre nosotros</a></li>
          <li><a href="#features">Grupo EcoTech</a></li>
          <li><a href="#pricing">Prototipos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <div className="menu-icon">
          <span>&#9776;</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
