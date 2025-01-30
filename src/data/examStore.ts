import { z } from 'zod';
import questionsData from './questions.json';

const QuestionSchema = z.object({
  question: z.string().min(10),
  options: z.record(z.string().min(1)),
  correct_answer: z.string().regex(/^[a-e]$/i)
});

export type Question = z.infer<typeof QuestionSchema> & {
  id: string;
};

export const EXAM_CONFIG = {
  totalQuestions: 40,
  timeLimit: 3600, // 1 hora em segundos
  passingScore: 0.65
};

export const validateQuestions = () => {
  return questionsData.map((q, index) => {
    const parsed = QuestionSchema.safeParse(q);
    if (!parsed.success) {
      console.error(`Erro na questão ${index + 1}:`, parsed.error);
      return null;
    }
    
    return {
      ...parsed.data,
      id: `Q-${index + 1}`
    };
  }).filter(Boolean) as Question[];
};

export const questions = validateQuestions();