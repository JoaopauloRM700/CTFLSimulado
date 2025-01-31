import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 animate-fade-in-down">
          Bem-vindo ao Simulado CTFL
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 transition-all hover:shadow-xl">
          <Link
            to="/simulado"
            className="inline-block w-full max-w-xs mx-auto bg-blue-600 text-white text-lg 
                     py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300
                     transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Iniciar Simulado
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;