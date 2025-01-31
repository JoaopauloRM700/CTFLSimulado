import React, { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "../data/examStore";

type QuestionProps = {
  question: Question;
  onAnswer: (answer: string) => void;
};

const QuestionCard: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setSelectedAnswer(key);
    onAnswer(key);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="question-card"
    >
      <h3 className="question-title" aria-live="polite">
        {question.question}
      </h3>
      <ul className="question-options">
        {Object.entries(question.options).map(([key, value]) => (
          <motion.li
            key={key}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className={`answer-button ${selectedAnswer === key ? "selected" : ""}`}
              onClick={() => handleClick(key)}
              aria-checked={selectedAnswer === key}
            >
              <span className="answer-key">{key.toUpperCase()}.</span>
              {value}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default QuestionCard;
