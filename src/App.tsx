import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

// Pergunta de exemplo
const perguntaExemplo = {
  id: 1,
  question: "Qual das seguintes alternativas NÃO é um tipo de revisão?",
  alternatives: {
    a: "Acompanhamento",
    b: "Revisão técnica",
    c: "Revisão informal",
    d: "Aprovação da gerência"
  },
  correct_answer: "d",
  explanation: "Aprovação da gerência não é um tipo de revisão técnica formal."
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Simulado CTFL</h1>
            </div>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">Início</a>
              <a href="/simulados" className="text-gray-600 hover:text-gray-900">Simulados</a>
              <a href="/perfil" className="text-gray-600 hover:text-gray-900">Perfil</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prepare-se para sua Certificação ISTQB® CTFL
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pratique com nossos simulados completos e melhore suas chances de sucesso no exame oficial.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Iniciar Simulado</h3>
              <p className="text-gray-600 mb-4">
                Teste seus conhecimentos com um exame cronometrado que simula o ambiente real do CTFL.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Iniciar Teste
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Ver seu Progresso</h3>
              <p className="text-gray-600 mb-4">
                Acompanhe seu desempenho e veja análises detalhadas de suas tentativas.
              </p>
              <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Ver Estatísticas
              </button>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Questão Exemplo</h3>
            <p>{perguntaExemplo.question}</p>
            <ul>
              {Object.entries(perguntaExemplo.alternatives).map(([key, value]) => (
                <li key={key} className="text-gray-700">{key.toUpperCase()}: {value}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
