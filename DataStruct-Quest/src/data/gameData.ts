import { Question, LevelType, DataStructureType } from '../types/gameTypes';

export const questions: Question[] = [
  // School Day Level
  {
    id: 'school-array',
    levelType: 'School Day',
    dataStructure: 'Array',
    scenario: "You need to organize your classroom assignment grades. Each student's score needs to be stored in order by their seat number.",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Array',
    explanation: "Arrays are perfect when you need to access items by their position or index. Just like seat numbers in class, arrays let you quickly find specific items when you know their position!",
    failureMessage: "That's not quite right. When you need to organize items by position or index, arrays are your best choice!"
  },
  {
    id: 'school-stack',
    levelType: 'School Day',
    dataStructure: 'Stack',
    scenario: "You're packing your school bag. Books are stacked one after another. But when the teacher asks you to take out your notebook... which book do you get first?",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Stack',
    explanation: "Stacks are Last In, First Out (LIFO). The last book you put in your backpack is the first one you'll take out!",
    failureMessage: "Oops! That book was buried under others. Try something that removes the last one added first!"
  },
  {
    id: 'school-queue',
    levelType: 'School Day',
    dataStructure: 'Queue',
    scenario: "It's lunchtime! Students line up at the cafeteria counter. Who gets served first?",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Queue',
    explanation: "Queues are First In, First Out (FIFO). Just like a lunch line, the first person to join the queue is the first to be served!",
    failureMessage: "Think about how a line works in real life. The first person who arrives gets served first!"
  },
  {
    id: 'school-map',
    levelType: 'School Day',
    dataStructure: 'Map',
    scenario: "You're creating a student directory with each student's name linked to their unique student ID.",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Map',
    explanation: "Maps store key-value pairs. They're perfect when you need to look up values (like student details) using a unique key (like student IDs)!",
    failureMessage: "When you need to connect unique keys to values, Maps are your best option!"
  },

  // Sports Game Level
  {
    id: 'sports-array',
    levelType: 'Sports Game',
    dataStructure: 'Array',
    scenario: "The coach needs to assign jersey numbers to players. Each player needs a specific number that can be quickly referenced during the game.",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Array',
    explanation: "Arrays allow you to access elements by their index. Perfect for jersey numbers where you need to quickly look up player information by position!",
    failureMessage: "When you need to organize items by their position and access them quickly, arrays are the way to go!"
  },
  {
    id: 'sports-stack',
    levelType: 'Sports Game',
    dataStructure: 'Stack',
    scenario: "The referee has a pile of penalty cards. When a foul occurs, they pull out the top card from their pocket.",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Stack',
    explanation: "Stacks follow Last In, First Out (LIFO). Just like the referee's cards, the last card placed on top is the first one to be taken!",
    failureMessage: "Think about how you'd take cards from a pile. You take from the top, not the bottom!"
  },
  {
    id: 'sports-queue',
    levelType: 'Sports Game',
    dataStructure: 'Queue',
    scenario: "Players are waiting on the bench. When the coach needs a substitute, which player goes in first?",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Queue',
    explanation: "Queues operate on First In, First Out (FIFO) principle. Just like substitutions, the player who has been waiting longest gets to play first!",
    failureMessage: "In a fair substitution system, the player who's been waiting the longest gets to play first!"
  },
  {
    id: 'sports-map',
    levelType: 'Sports Game',
    dataStructure: 'Map',
    scenario: "You need to keep track of each player's statistics using their unique jersey number as an identifier.",
    options: ['Array', 'Stack', 'Queue', 'Map'],
    correctAnswer: 'Map',
    explanation: "Maps are perfect for relating keys (jersey numbers) to values (player statistics). They allow quick lookups based on unique identifiers!",
    failureMessage: "When you need to connect unique identifiers with data, a Map is the most efficient choice!"
  }
];

export const getQuestionsByLevel = (level: LevelType): Question[] => {
  return questions.filter(q => q.levelType === level);
};

export const getLevels = (): LevelType[] => {
  return ['School Day', 'Sports Game'];
};

export const getDataStructures = (): DataStructureType[] => {
  return ['Array', 'Stack', 'Queue', 'Map'];
};
