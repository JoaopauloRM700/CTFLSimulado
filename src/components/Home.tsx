import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="container">
        <h1 className="home-title">Bem-vindo ao Simulado CTFL</h1>
        <p>Teste seus conhecimentos e prepare-se para a certificação.</p>
        <Link to="/simulado" className="home-button">
          Iniciar Simulado
        </Link>
      </div>
    </div>
  );
};

export default Home;
