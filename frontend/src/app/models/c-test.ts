export interface CTestRequest {
  text: string;
}

export interface CTestResponse {
  testText: string;
  correctAnswers: string[];
  totalGaps: number;
}

export interface CTestResult {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  userAnswers: string[];
  correctAnswersList: string[];
  feedback: string;
}
