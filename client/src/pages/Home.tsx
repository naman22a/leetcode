import React, { useEffect } from 'react';
import * as api from '../api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { twMerge } from 'tailwind-merge';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const meQuery = useQuery({
        queryKey: ['users', 'me'],
        queryFn: api.users.me
    });
    const problemsQuery = useQuery({
        queryKey: ['problems'],
        queryFn: api.problems.findAll
    });

    useEffect(() => {
        if (!meQuery.isLoading && (meQuery.isError || !meQuery.data)) {
            navigate('/auth');
        }
    }, [meQuery.isError, meQuery.data, meQuery.isLoading, navigate]);

    if (meQuery.isLoading) return <p>Loading...</p>;

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Problems</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Difficulty</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {problemsQuery.data?.map((problem, index) => (
                        <TableRow key={problem.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell
                                className="hover:text-amber-400 cursor-pointer font-bold"
                                onClick={() => {
                                    navigate(`/problems/${problem.id}`);
                                }}
                            >
                                {problem.title}
                            </TableCell>
                            <TableCell>
                                {problem.description.slice(0, 100)}...
                            </TableCell>
                            <TableCell
                                className={twMerge(
                                    'font-semibold',
                                    problem.level === 'easy' &&
                                        'text-green-500',
                                    problem.level === 'medium' &&
                                        'text-amber-400',
                                    problem.level === 'hard' && 'text-red-600'
                                )}
                            >
                                {problem.level.toUpperCase()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Home;
