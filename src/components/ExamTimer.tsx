import React, { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

type ExamTimerProps = {
  duration: number;
  onTimeUp: () => void;
};

const ExamTimer: React.FC<ExamTimerProps> = ({ duration, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const timerRef = useRef<number>(); // Tipo corrigido para number

  useEffect(() => {
    // Configura o intervalo do timer
    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = Math.max(prev - 1, 0);
        if (newTime === 0) onTimeUp();
        return newTime;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current !== undefined) {
        clearInterval(timerRef.current);
      }
    };
  }, [onTimeUp]); // Adicionada dependência onTimeUp

  // Formatação do tempo
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={`flex items-center gap-2 text-lg font-semibold ${
      timeRemaining <= 300 ? 'text-red-600 animate-pulse' : 'text-gray-700'
    }`}>
      <Clock className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default ExamTimer;