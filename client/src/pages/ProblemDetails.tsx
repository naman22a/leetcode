import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '@/api';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/ui/button';
import Editor from '@monaco-editor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Submissions from '../components/Submissions';
import toast from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const ProblemDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [tabValue, setTabValue] = useState('description');
    const [errors, setErrors] = useState<string[]>([]);
    const [language, setLanguage] = useState('cpp');

    const client = useQueryClient();
    const {
        data: problem,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['problems', id],
        queryFn: () => api.problems.findOne(parseInt(id!))
    });

    const submissionMut = useMutation({
        mutationKey: ['submissions', 'create'],
        mutationFn: ({ id, c, l }: { id: number; c: string; l: string }) =>
            api.submissions.create(id, c, l)
    });

    useEffect(() => {
        if (!isLoading && (isError || !problem)) {
            navigate('/auth');
        }
        setCode(problem?.boilerPlate[0].code!);
    }, [isError, problem, isLoading, navigate]);

    if (isLoading) return <p>Loading...</p>;

    const handleSubmission = async () => {
        setErrors([]);
        const res = await submissionMut.mutateAsync({
            id: problem?.id!,
            c: code,
            l: language
        });
        for (const r of res) {
            if (r.success) toast.success('Passed');
            else {
                setErrors((errs) => [...errs, r.output]);
                toast.error('Failed');
            }
        }
        client.invalidateQueries({ queryKey: ['submissions'] });
        setTabValue('submissions');
    };

    return (
        <div className="flex w-full h-screen p-5">
            <div className="w-1/2 h-full">
                <Tabs defaultValue={tabValue}>
                    <TabsList>
                        <TabsTrigger value="description">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="submissions">
                            Submissions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                        <h1 className="text-3xl font-bold">{problem?.title}</h1>
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
                                    <span className="font-semibold">
                                        Input:
                                    </span>{' '}
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {testCase.input}
                                    </div>
                                </h3>
                                <h3>
                                    <span className="font-semibold">
                                        Output:
                                    </span>
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {testCase.output}
                                    </div>
                                </h3>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent
                        value="submissions"
                        className="h-screen overflow-y-scroll"
                    >
                        <Submissions id={problem!.id} />
                    </TabsContent>
                </Tabs>
            </div>
            <div className="w-1/2 h-full">
                Language:{' '}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{language}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setLanguage('cpp')}>
                            cpp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('java')}>
                            java
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('python')}>
                            python
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setLanguage('javascript')}
                        >
                            javascript
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Editor
                    height="75vh"
                    defaultLanguage={problem?.boilerPlate[0].language}
                    defaultValue={problem?.boilerPlate[0].code}
                    onChange={(value) => setCode(value!)}
                    theme="vs-dark"
                />
                <div className="flex mt-5 gap-5">
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg disabled:cursor-not-allowed"
                        onClick={() => handleSubmission()}
                        disabled={submissionMut.isPending}
                    >
                        {submissionMut.isPending ? 'Loading...' : 'Submit'}
                    </Button>
                </div>
                {errors.length > 0 && (
                    <div className="text-red-500">
                        {errors.map((error) => (
                            <p>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDetails;
