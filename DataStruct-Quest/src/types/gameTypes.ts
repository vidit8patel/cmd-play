export type DataStructureType = 'Array' | 'Stack' | 'Queue' | 'Map';

export type LevelType = 'School Day' | 'Sports Game';

export interface Question {
  id: string;
  levelType: LevelType;
  dataStructure: DataStructureType;
  scenario: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  failureMessage: string;
}

export interface GameState {
  currentLevel: LevelType | null;
  currentQuestionIndex: number;
  answeredQuestions: Record<string, boolean>; // Question ID -> correct/incorrect
  completedLevels: LevelType[];
  currentScreen: 'intro' | 'levelSelect' | 'scenario' | 'question' | 'result' | 'levelComplete';
}

export interface LevelProgress {
  level: LevelType;
  completedQuestions: number;
  totalQuestions: number;
}
