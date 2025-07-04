import API from '..';
import { PaginatedProblems, ProblemDetails } from './types';

export const findAll = async (
    page = 1,
    limit = 10
): Promise<PaginatedProblems> => {
    try {
        const res = await API.get('/problems', {
            params: { page, limit }
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return {
            data: [],
            meta: { totalCount: 0, totalPages: 0, currentPage: 1 }
        };
    }
};

export const findOne = async (id: number): Promise<ProblemDetails | null> => {
    try {
        const res = await API.get(`/problems/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
