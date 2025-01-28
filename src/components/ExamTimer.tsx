import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useExamStore } from '../store/examStore';

export const ExamTimer: React.FC = () => {
  const { timeRemaining, updateTime, endExam, isExamActive } = useExamStore();

  useEffect(() => {
    if (!isExamActive) return;

    const timer = setInterval(() => {
      updateTime();
      if (timeRemaining <= 1) {
        endExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isExamActive]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Clock className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};