import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página não encontrada</h1>
      <p className="not-found-text">
        A página que você está procurando não existe ou foi movida.
      </p>
    </div>
  );
};

export default NotFound;
