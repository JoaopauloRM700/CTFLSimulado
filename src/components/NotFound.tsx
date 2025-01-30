import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="text-lg text-gray-600">
        A página que você está procurando não existe ou foi movida.
      </p>
    </div>
  );
};

export default NotFound;