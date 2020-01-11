export interface Result {
  id?: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  answerList: [{questionId: string, answer: string}];
  created_on?;
}
