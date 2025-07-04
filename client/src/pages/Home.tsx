import React, { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const navigate = useNavigate();

    const meQuery = useQuery({
        queryKey: ['users', 'me'],
        queryFn: api.users.me
    });

    const problemsQuery = useQuery({
        queryKey: ['problems', page],
        queryFn: () => api.problems.findAll(page, limit)
    });

    useEffect(() => {
        if (!meQuery.isLoading && (meQuery.isError || !meQuery.data)) {
            navigate('/auth');
        }
    }, [meQuery.isError, meQuery.data, meQuery.isLoading, navigate]);

    if (meQuery.isLoading || problemsQuery.isLoading) return <p>Loading...</p>;

    const problems = problemsQuery.data?.data ?? [];
    const meta = problemsQuery.data?.meta;

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
                    {problems.map((problem, index) => (
                        <TableRow key={problem.id}>
                            <TableCell>
                                {(page - 1) * limit + index + 1}
                            </TableCell>
                            <TableCell
                                className="hover:text-amber-400 cursor-pointer font-bold"
                                onClick={() =>
                                    navigate(`/problems/${problem.id}`)
                                }
                            >
                                {problem.title}
                            </TableCell>
                            <TableCell>
                                {problem.description.slice(0, 100)}...
                            </TableCell>
                            <TableCell
                                className={cn(
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

            {/* Pagination Controls */}
            <div className="flex justify-between mt-6">
                <Button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <p className="text-sm text-muted-foreground">
                    Page {page} of {meta?.totalPages ?? '?'}
                </p>
                <Button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={meta && page >= meta.totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Home;
