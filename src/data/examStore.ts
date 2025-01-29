import questionsData from "./questions.json";

// Ajuste no tipo para refletir a estrutura do JSON corretamente
export type Question = {
  id?: number;  // O ID pode não existir no JSON original
  question: string;
  options: { [key: string]: string };  // Mudamos "alternatives" para "options"
  correct_answer: string;
};

// Função para garantir que todas as perguntas tenham pelo menos 4 ou 5 opções
const normalizeOptions = (options: { [key: string]: string }) => {
  const defaultOptions = { a: "N/A", b: "N/A", c: "N/A", d: "N/A", e: "N/A" };

  // Preenche qualquer alternativa que estiver faltando com "N/A"
  const normalizedOptions: { [key: string]: string } = { ...defaultOptions, ...options };

  // Se a alternativa "e" não existir na questão original, removemos
  if (!("e" in options)) {
    delete normalizedOptions.e;
  }

  return normalizedOptions;
};


// Converte os dados do JSON para o formato esperado
export const questions: Question[] = questionsData.map((q, index) => ({
  id: index + 1,  // Adiciona um ID sequencial
  question: q.question,
  options: normalizeOptions(q.options),  // Normaliza as alternativas para evitar undefined
  correct_answer: q.correct_answer
}));

// Configuração do exame
export const EXAM_CONFIG = {
  totalQuestions: 40, // Número de questões por simulado
  timeLimit: 60, // Tempo total para o exame (segundos)
  passingScore: 0.6, // O candidato precisa de 60% de acertos para passar
};
