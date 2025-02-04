'use client';
import { redirect, useParams } from 'next/navigation';
import * as api from '@/api';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';

function ProblemPage() {
    const { toast } = useToast();
    const { id: myid } = useParams<{ id: string }>();
    const id = Number(myid);

    const { data: problem, isLoading: problemIsLoading } = useQuery({
        queryKey: ['problems', id],
        queryFn: () => api.problems.findOne(id)
    });
    const {
        data: user,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: api.users.me
    });

    if (isLoading || problemIsLoading) return <p>Loading....</p>;

    if (isError || !user) {
        toast({
            title: 'Unauthorized',
            variant: 'destructive'
        });
        console.error(error);
        redirect('/auth');
    }

    return (
        <div className="p-5">
            <div className="flex w-full h-screen">
                <div className="w-1/2 h-full">
                    <h1 className="text-4xl font-bold">{problem?.title}</h1>
                    <div
                        className={twMerge(
                            'inline-block py-2 px-6 rounded-full my-5',
                            problem?.level === 'hard' &&
                                'bg-red-500 text-white',
                            problem?.level === 'medium' &&
                                'bg-amber-400 text-white',
                            problem?.level === 'easy' &&
                                'bg-green-500 text-white'
                        )}
                    >
                        {problem?.level.toUpperCase()}
                    </div>
                    <p className="mb-5">{problem?.description}</p>
                    {(
                        JSON.parse(problem?.testCases!) as {
                            input: string;
                            output: string;
                        }[]
                    ).map((testCase, index: number) => (
                        <div key={index}>
                            <h2 className="text-xl font-semibold my-3">
                                Example {index + 1}:
                            </h2>
                            <h3>
                                <span className="font-semibold">Input:</span>{' '}
                                {testCase.input}
                            </h3>
                            <h3>
                                <span className="font-semibold">Output:</span>
                                {testCase.output}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 h-full"></div>
            </div>
        </div>
    );
}

export default ProblemPage;
