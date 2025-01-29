import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exam from "./components/Exam"; // (Criamos esse arquivo depois)
import Home from "./components/Home"; // (Criamos esse arquivo depois)
import App from "./App";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulado" element={<Exam />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
