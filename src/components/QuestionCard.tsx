import React from 'react';

type QuestionProps = {
  question: {
    id: number;
    question: string;
    alternatives: { [key: string]: string };
    correct_answer: string;
    explanation: string;
  };
  onAnswer: (answer: string) => void;
};

const QuestionCard: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <ul>
        {Object.entries(question.alternatives).map(([key, value]) => (
          <li key={key} className="mb-2">
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={() => onAnswer(key)}
            >
              {key.toUpperCase()}: {value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
