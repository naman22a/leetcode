import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '@/api';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/ui/button';
import Editor from '@monaco-editor/react';

const ProblemDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const {
        data: problem,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['problems', id],
        queryFn: () => api.problems.findOne(parseInt(id!))
    });

    useEffect(() => {
        if (!isLoading && (isError || !problem)) {
            navigate('/auth');
        }
        setCode(problem?.boilerPlate[0].code!);
    }, [isError, problem, isLoading, navigate]);

    if (isLoading) return <p>Loading...</p>;

    const handleRunTestsCases = () => {
        // TODO: make an api call
        console.log(code);
    };

    const handleSubmission = () => {
        // TODO: make an api call
        console.log(code);
    };

    return (
        <div className="flex w-full h-screen p-5">
            <div className="w-1/2 h-full">
                <h1 className="text-3xl font-bold">{problem?.title}</h1>
                <div
                    className={twMerge(
                        'inline-block py-2 px-6 rounded-full my-5',
                        problem?.level === 'hard' && 'bg-red-500 text-white',
                        problem?.level === 'medium' &&
                            'bg-amber-400 text-white',
                        problem?.level === 'easy' && 'bg-green-500 text-white'
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
            <div className="w-1/2 h-full">
                <Editor
                    height="75vh"
                    defaultLanguage={problem?.boilerPlate[0].language}
                    defaultValue={problem?.boilerPlate[0].code}
                    onChange={(value) => setCode(value!)}
                    theme="vs-dark"
                />
                <div className="flex mt-5 gap-5">
                    <Button
                        className="bg-gray-800 text-white font-semibold text-lg ml-auto"
                        onClick={() => handleRunTestsCases()}
                    >
                        Run
                    </Button>
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg"
                        onClick={() => handleSubmission()}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetails;
