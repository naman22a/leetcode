'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '@/api';
import { Problem } from '@/api/problems/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { twMerge } from 'tailwind-merge';

function Home() {
    const router = useRouter();
    const { toast } = useToast();
    const [problems, setProblems] = useState<Problem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const user = await api.users.me();

                if (!user) {
                    toast({
                        title: 'Unauthorized',
                        variant: 'destructive'
                    });
                    router.push('/auth');
                }

                const ps = await api.problems.findAll();
                setProblems(ps);
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Unauthorized',
                    variant: 'destructive'
                });
                router.push('/auth');
            }
        })();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await api.auth.logout();

            if (res.ok) {
                toast({
                    title: 'Logged out'
                });
                router.push('/auth');
            } else {
                toast({
                    title: 'Something went wrong',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="p-5">
            <h1 className="font-semibold text-3xl mb-5">Leetcode dashboard</h1>
            <Button className="mb-5" onClick={() => handleLogout()}>
                Logout
            </Button>

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
                            <TableCell>{index + 1}</TableCell>
                            <TableCell
                                className="hover:text-amber-400 cursor-pointer font-bold"
                                onClick={() => {
                                    router.push(`/problems/${problem.id}`);
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
}

export default Home;
