export interface Question {
  id: number;
  question: string;
  alternatives: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_answer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  date: string;
  answers: Record<number, string>;
}

export interface UserProfile {
  id: string;
  email: string;
  examResults: ExamResult[];
  totalExamsTaken: number;
  averageScore: number;
}