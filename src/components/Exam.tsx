import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ExamTimer from "./ExamTimer";
import { questions, EXAM_CONFIG, Question } from "../data/examStore";

// Função para embaralhar as perguntas e selecionar 40 aleatoriamente
const getRandomQuestions = (allQuestions: Question[], count: number): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Exam: React.FC = () => {
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [restartExamKey, setRestartExamKey] = useState(0); // Chave para reiniciar o timer

  useEffect(() => {
    setExamQuestions(getRandomQuestions(questions, EXAM_CONFIG.totalQuestions));
  }, []);

  const handleAnswer = (answer: string) => {
    if (examQuestions.length === 0) return;

    const currentQuestion = examQuestions[currentQuestionIndex];

    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < examQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleTimeUp = () => {
    setShowResult(true); // Finaliza o exame quando o tempo acabar
  };

  const restartExam = () => {
    setExamQuestions(getRandomQuestions(questions, EXAM_CONFIG.totalQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setRestartExamKey((prev) => prev + 1); // Força a reinicialização do temporizador
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {showResult ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold">Simulado Finalizado!</h2>
          <p className="text-lg">
            Sua pontuação: {score} / {examQuestions.length} (
            {((score / examQuestions.length) * 100).toFixed(2)}%)
          </p>
          <p
            className={`text-lg font-semibold ${
              score >= EXAM_CONFIG.passingScore * examQuestions.length
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {score >= EXAM_CONFIG.passingScore * examQuestions.length
              ? "Parabéns! Você passou!"
              : "Infelizmente, você não passou."}
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={restartExam}
          >
            Tentar Novamente
          </button>
        </div>
      ) : (
        <>
          <ExamTimer key={restartExamKey} duration={3600} onTimeUp={handleTimeUp} />
          {examQuestions.length > 0 && (
            <QuestionCard
              question={examQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Exam;
