import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ExamTimer from "./ExamTimer";
import { questions, EXAM_CONFIG, Question } from "../data/examStore";

interface ExamQuestion extends Question {
  id: string;
}

const Exam: React.FC = () => {
  // Estados do componente
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [restartExamKey, setRestartExamKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar as questões
  useEffect(() => {
    const loadQuestions = () => {
      try {
        if (questions.length === 0) {
          throw new Error("Nenhuma questão disponível");
        }

        const processQuestions = () => {
          return questions
            .sort(() => Math.random() - 0.5)
            .slice(0, EXAM_CONFIG.totalQuestions)
            .map((q, index) => ({
              ...q,
              id: `Q-${index + 1}`,
              options: Object.fromEntries(
                Object.entries(q.options).sort(([a], [b]) => a.localeCompare(b))
              )
            }));
        };

        setExamQuestions(processQuestions());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar questões");
        setShowResult(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = examQuestions[currentQuestionIndex];
    
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < examQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  
  const handleTimeUp = () => setShowResult(true);

  const restartExam = () => {
    setIsLoading(true);
    try {
      const newQuestions = questions
        .sort(() => Math.random() - 0.5)
        .slice(0, EXAM_CONFIG.totalQuestions)
        .map((q, index) => ({
          ...q,
          id: `Q-${index + 1}`,
          options: Object.fromEntries(
            Object.entries(q.options).sort(([a], [b]) => a.localeCompare(b))
          )
        }));

      setExamQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
      setRestartExamKey(prev => prev + 1);
    } catch (err) {
      setError("Erro ao reiniciar o simulado");
    } finally {
      setIsLoading(false);
    }
  };

  // Estados de carregamento
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          <div className="h-40 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-4">Erro no Carregamento</h2>
        <p className="mb-4">{error}</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={restartExam}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Renderização principal
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {showResult ? (
        // Tela de resultados
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Simulado Finalizado!</h2>
          <div className="mb-6">
            <p className="text-lg mb-2">
              Acertos: {score}/{examQuestions.length}
            </p>
            <p className={`text-xl font-semibold ${
              score >= EXAM_CONFIG.passingScore * examQuestions.length 
                ? "text-green-600" 
                : "text-red-600"
            }`}>
              {((score / examQuestions.length) * 100).toFixed(1)}% de acerto
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={restartExam}
            >
              Refazer Simulado
            </button>
            <a
              href="/"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Voltar ao Início
            </a>
          </div>
        </div>
      ) : (
        // Interface do exame
        <>
          <div className="mb-8">
            <ExamTimer
              key={restartExamKey}
              duration={EXAM_CONFIG.timeLimit}
              onTimeUp={handleTimeUp}
            />
          </div>

          {/* Navegação entre questões */}
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {examQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  currentQuestionIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Questão atual */}
          {examQuestions.length > 0 && (
            <QuestionCard
              question={examQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}

          {/* Controles de navegação */}
          <div className="mt-8 flex justify-between">
            <button
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={currentQuestionIndex === examQuestions.length - 1}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Exam;