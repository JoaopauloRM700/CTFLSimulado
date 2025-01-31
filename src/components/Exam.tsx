import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ExamTimer from "./ExamTimer";
import { questions, EXAM_CONFIG, Question } from "../data/examStore";

interface ExamQuestion extends Question {
  id: string;
}

type QuestionStatus = 'answered' | 'unanswered' | 'current';

const Exam: React.FC = () => {
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [restartExamKey, setRestartExamKey] = useState(0);
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
            options: Object.fromEntries(
              Object.entries(q.options).sort(([a], [b]) => a.localeCompare(b))
            )
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

    const initializeQuestionStatus = (count: number) => {
      const status: Record<number, QuestionStatus> = {};
      for (let i = 0; i < count; i++) {
        status[i] = 'unanswered';
      }
      setQuestionStatus(status);
    };

    loadQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = examQuestions[currentQuestionIndex];
    
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }

    setQuestionStatus(prev => ({
      ...prev,
      [currentQuestionIndex]: 'answered'
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < examQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setQuestionStatus(prev => ({
        ...prev,
        [nextIndex]: 'current'
      }));
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
      initializeQuestionStatus(newQuestions.length);
    } catch (err) {
      setError("Erro ao reiniciar o simulado");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeQuestionStatus = (count: number) => {
    const status: Record<number, QuestionStatus> = {};
    for (let i = 0; i < count; i++) {
      status[i] = i === 0 ? 'current' : 'unanswered';
    }
    setQuestionStatus(status);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-red-50 rounded-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Erro no Carregamento</h2>
          <p className="text-lg text-gray-700">{error}</p>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                     transition-transform transform hover:scale-105"
            onClick={restartExam}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {showResult ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-blue-800">Simulado Finalizado!</h2>
          <div className="space-y-4">
            <p className="text-xl">
              Acertos: <span className="font-bold">{score}</span> de {examQuestions.length}
            </p>
            <p className={`text-2xl font-semibold ${
              score >= EXAM_CONFIG.passingScore * examQuestions.length 
                ? "text-green-600" 
                : "text-red-600"
            }`}>
              {((score / examQuestions.length) * 100).toFixed(1)}% de acerto
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                       transition-transform transform hover:scale-105 flex-1 max-w-xs"
              onClick={restartExam}
            >
              Refazer Simulado
            </button>
            <a
              href="/"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 
                       transition-transform transform hover:scale-105 flex-1 max-w-xs"
            >
              Voltar ao Início
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <ExamTimer
              key={restartExamKey}
              duration={EXAM_CONFIG.timeLimit}
              onTimeUp={handleTimeUp}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Progresso</span>
                <span>Questão {currentQuestionIndex + 1} de {examQuestions.length}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-10 gap-2 mb-8">
              {examQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                    ${questionStatus[index] === 'answered' ? 'bg-green-500 text-white hover:bg-green-600' :
                    index === currentQuestionIndex ? 'bg-blue-600 text-white hover:bg-blue-700' :
                    'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              {examQuestions.length > 0 && (
                <QuestionCard
                  question={examQuestions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                />
              )}
            </div>

            <div className="flex justify-between gap-4">
              <button
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 
                         disabled:opacity-50 transition-transform transform hover:scale-105 flex-1"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
              >
                ← Anterior
              </button>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                         disabled:opacity-50 transition-transform transform hover:scale-105 flex-1"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                disabled={currentQuestionIndex === examQuestions.length - 1}
              >
                Próxima →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;