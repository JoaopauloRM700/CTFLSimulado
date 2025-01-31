import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ExamTimer from "./ExamTimer";
import { questions, EXAM_CONFIG, Question } from "../data/examStore";

interface ExamQuestion extends Question {
  id: string;
}

type QuestionStatus = "answered" | "unanswered" | "current";

const Exam: React.FC = () => {
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>({});

  useEffect(() => {
    const loadQuestions = () => {
      try {
        if (questions.length === 0) throw new Error("Nenhuma questão disponível");

        const selectedQuestions = questions
          .sort(() => Math.random() - 0.5)
          .slice(0, EXAM_CONFIG.totalQuestions)
          .map((q, index) => ({
            ...q,
            id: `Q-${index + 1}`,
            options: Object.fromEntries(Object.entries(q.options).sort(([a], [b]) => a.localeCompare(b))),
          }));

        setExamQuestions(selectedQuestions);
        setError(null);
        initializeQuestionStatus(selectedQuestions.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar questões");
        setShowResult(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const initializeQuestionStatus = (count: number) => {
    const status: Record<number, QuestionStatus> = {};
    for (let i = 0; i < count; i++) {
      status[i] = i === 0 ? "current" : "unanswered"; // A primeira questão é a atual
    }
    setQuestionStatus(status);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = examQuestions[currentQuestionIndex];

    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestionIndex]: "answered", // Marca a questão como respondida
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < examQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setQuestionStatus((prev) => ({
        ...prev,
        [nextIndex]: "current", // Define a próxima questão como a ativa
      }));
    } else {
      setShowResult(true);
    }
  };

  const handleTimeUp = () => setShowResult(true);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando questões...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Erro no Carregamento</h2>
        <p className="error-message">{error}</p>
        <button className="error-button" onClick={() => window.location.reload()}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      {showResult ? (
        <div className="result-container">
          <h2 className="result-title">Simulado Finalizado!</h2>
          <p className="result-score">
            Acertos: <span className="highlight">{score}</span> de {examQuestions.length}
          </p>
          <p className={`result-percentage ${score >= EXAM_CONFIG.passingScore * examQuestions.length ? "pass" : "fail"}`}>
            {((score / examQuestions.length) * 100).toFixed(1)}% de acerto
          </p>
          <div className="result-buttons">
            <button className="result-button" onClick={() => window.location.reload()}>
              Refazer Simulado
            </button>
            <a href="/" className="result-button secondary">
              Voltar ao Início
            </a>
          </div>
        </div>
      ) : (
        <div className="exam-content">
          <ExamTimer duration={EXAM_CONFIG.timeLimit} onTimeUp={handleTimeUp} />

          <div className="question-navigation">
            {examQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`nav-button 
                  ${questionStatus[index] === "answered" ? "answered" : ""} 
                  ${index === currentQuestionIndex ? "current" : ""}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="question-card">
            {examQuestions.length > 0 && (
              <QuestionCard question={examQuestions[currentQuestionIndex]} onAnswer={handleAnswer} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
