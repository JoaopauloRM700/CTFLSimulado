import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Simulado CTFL</h1>
      <Link
        to="/simulado"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Iniciar Simulado
      </Link>
    </div>
  );
};

export default Home;
