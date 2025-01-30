import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>Simulado CTFL - Página Inicial</title>
        <meta name="description" content="Simulado oficial para certificação CTFL" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Bem-vindo ao Simulado CTFL
      </h1>

      <Link
        to="/simulado"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Iniciar Simulado
      </Link>
    </div>
  );
};

export default Home;