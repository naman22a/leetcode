export interface Problem {
    id: number;
    title: string;
    description: string;
    level: 'easy' | 'medium' | 'hard';
    testCases: { input: string; output: string }[];
}
