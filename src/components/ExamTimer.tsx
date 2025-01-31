import React, { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

const ExamTimer: React.FC<{ duration: number; onTimeUp: () => void }> = ({ duration, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = Math.max(prev - 1, 0);
        if (newTime === 0) {
          clearInterval(timerRef.current!);
          onTimeUp();
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [duration, onTimeUp]);

  return (
    <div className={`timer-container ${timeRemaining <= 300 ? "timer-critical" : ""}`}>
      <Clock className="timer-icon" />
      <span>
        {String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:
        {String(timeRemaining % 60).padStart(2, "0")}
      </span>
    </div>
  );
};

export default ExamTimer;
