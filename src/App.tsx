import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading dos componentes
const Home = lazy(() => import('./components/Home'));
const Exam = lazy(() => import('./components/Exam'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/CTFLSimulado" element={<Home />} />
            <Route path="/simulado" element={<Exam />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;