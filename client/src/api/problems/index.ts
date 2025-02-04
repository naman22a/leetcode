import API from '..';
import { Problem } from './types';

export const findAll = async (): Promise<Problem[]> => {
    try {
        const res = await API.get('/problems');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const findOne = async (id: number): Promise<Problem | null> => {
    try {
        const res = await API.get(`/problems/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
