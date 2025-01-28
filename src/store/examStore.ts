import { create } from 'zustand';
import { Question, ExamResult } from '../types/exam';

interface ExamState {
  currentExam: Question[] | null;
  answers: Record<number, string>;
  timeRemaining: number;
  isExamActive: boolean;
  examResults: ExamResult[];
  setCurrentExam: (questions: Question[]) => void;
  setAnswer: (questionId: number, answer: string) => void;
  startExam: () => void;
  endExam: () => void;
  updateTime: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentExam: null,
  answers: {},
  timeRemaining: 30 * 60, // 30 minutes in seconds
  isExamActive: false,
  examResults: [],
  
  setCurrentExam: (questions) => set({ currentExam: questions }),
  
  setAnswer: (questionId, answer) => 
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    })),
  
  startExam: () => set({ isExamActive: true }),
  
  endExam: () => {
    set((state) => {
      if (!state.currentExam) return state;
      
      const result: ExamResult = {
        totalQuestions: state.currentExam.length,
        correctAnswers: state.currentExam.filter(
          (q) => state.answers[q.id] === q.correct_answer
        ).length,
        timeSpent: 1800 - state.timeRemaining,
        date: new Date().toISOString(),
        answers: state.answers
      };
      
      return {
        isExamActive: false,
        examResults: [...state.examResults, result],
        answers: {},
        timeRemaining: 30 * 60
      };
    });
  },
  
  updateTime: () => set((state) => ({
    timeRemaining: Math.max(0, state.timeRemaining - 1)
  }))
}));