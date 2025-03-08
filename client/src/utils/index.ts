import dayjs from 'dayjs';

export const mapSubmissions = (
    submissions: {
        submittedOn: string;
    }[]
) => {
    const results: {
        date: string;
        count: number;
        level: number;
    }[] = [];

    submissions.forEach((sub) => {
        results.push({
            date: dayjs(sub.submittedOn).format('YYYY-MM-DD'),
            count: 1,
            level: 1
        });
    });

    const frequencyMap = results.reduce((acc, item) => {
        // @ts-ignore
        acc[item.date] = (acc[item.date] || 0) + 1;
        return acc;
    }, {});

    const frequencyArray = Object.entries(frequencyMap).map(
        ([date, count]) => ({
            date,
            count: count as number,
            level: (count as number) % 4
        })
    );

    return frequencyArray;
};
