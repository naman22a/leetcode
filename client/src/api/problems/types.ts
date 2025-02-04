export interface Problem {
    id: number;
    title: string;
    description: string;
    level: 'easy' | 'medium' | 'hard';
    testCases: string;
}

export interface ProblemDetails extends Problem {
    boilerPlate: {
        code: string;
        language: string;
        problemId: number;
    }[];
}
