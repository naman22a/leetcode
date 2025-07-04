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

export type PaginatedProblems = {
    data: Problem[];
    meta: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
    };
};
