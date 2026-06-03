export interface Question {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  weightage?: 'high' | 'medium' | 'low';
  isCgSpecific?: boolean;
  examRelevance?: string;
}

export interface TestState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  isReviewing: boolean;
  markedForReview: boolean[];
  visited: boolean[];
  mode: 'quiz' | 'mock' | 'pyq';
  subjectName: string;
  elapsedTime: number;
  totalTime: number;
  streak: number;
}
