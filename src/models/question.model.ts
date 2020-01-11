export interface Question {
  id?: string;
  question: string;
  marks: number;
  options: string[];
  correctAnswer: string;
  created_on?;
}
