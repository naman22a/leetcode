import API from '..';

export const create = async (
    id: number,
    code: string,
    language: string
): Promise<{ success: boolean; output: string }[]> => {
    try {
        const res = await API.post(`/submissions/${id}`, { code, language });
        return res.data;
    } catch (error) {
        console.error(error);
        return [{ success: false, output: error!.toString() }];
    }
};

export const findAll = async (
    id: number
): Promise<
    {
        id: string;
        code: string;
        userId: number;
        problemId: number;
        status: 'AC' | 'WA';
        submittedOn: string;
        language: string;
    }[]
> => {
    try {
        const res = await API.get(`/submissions/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
