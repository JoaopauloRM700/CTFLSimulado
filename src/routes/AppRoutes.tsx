import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exam from "../components/Exam"; // (Criamos esse arquivo depois)
import Home from "../components/Home"; // (Criamos esse arquivo depois)

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/CTFLSimulado" element={<Home />} />
        <Route path="/CTFLSimulado/simulado" element={<Exam />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
