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
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-semibold mb-4" aria-live="polite">
        {question.question}
      </h3>
      <ul className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <motion.li
            key={key}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className={`w-full p-3 text-left rounded-lg transition-all ${
                selectedAnswer === key
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleClick(key)}
              aria-checked={selectedAnswer === key}
            >
              <span className="font-mono mr-2">{key.toUpperCase()}.</span>
              {value}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default QuestionCard;