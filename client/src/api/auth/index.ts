import API from '..';
import axios from 'axios';
import { OkResponse } from '../types';

export const logout = async (): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/logout');
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};
