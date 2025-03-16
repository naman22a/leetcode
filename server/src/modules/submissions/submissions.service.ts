import { Injectable } from '@nestjs/common';
import { Language } from '@prisma/client';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

interface ExecutionResult {
    success: boolean;
    output: string;
}

const LANG_CONFIGS: Record<
    string,
    { image: string; compile?: string[]; run: string[] }
> = {
    cpp: {
        image: 'gcc:latest',
        compile: ['g++', '/app/solution.cpp', '-o', '/app/solution'],
        run: ['/app/solution'],
    },
    python: {
        image: 'python:3.9',
        run: ['python3', '/app/solution.py'],
    },
    javascript: {
        image: 'node:18',
        run: ['node', '/app/solution.js'],
    },
    java: {
        image: 'openjdk:17',
        compile: ['javac', '/app/Solution.java'],
        run: ['java', '-cp', '/app', 'Solution'],
    },
    go: {
        image: 'golang:1.20',
        compile: ['go', 'build', '-o', '/app/solution', '/app/solution.go'],
        run: ['/app/solution'],
    },
    rust: {
        image: 'rust:1.69',
        compile: ['rustc', '/app/solution.rs', '-o', '/app/solution'],
        run: ['/app/solution'],
    },
    csharp: {
        image: 'mcr.microsoft.com/dotnet/sdk:7.0',
        compile: ['csc', '/app/Solution.cs'],
        run: ['dotnet', '/app/Solution.dll'],
    },
    ruby: {
        image: 'ruby:3.2',
        run: ['ruby', '/app/solution.rb'],
    },
    swift: {
        image: 'swift:5.8',
        compile: ['swiftc', '/app/solution.swift', '-o', '/app/solution'],
        run: ['/app/solution'],
    },
    php: {
        image: 'php:8.2',
        run: ['php', '/app/solution.php'],
    },
    kotlin: {
        image: 'openjdk:17',
        compile: [
            'kotlinc',
            '/app/Solution.kt',
            '-include-runtime',
            '-d',
            '/app/Solution.jar',
        ],
        run: ['java', '-jar', '/app/Solution.jar'],
    },
    dart: {
        image: 'dart:3.0',
        compile: [
            'dart',
            'compile',
            'exe',
            '/app/solution.dart',
            '-o',
            '/app/solution',
        ],
        run: ['/app/solution'],
    },
    r: {
        image: 'r-base:latest',
        run: ['Rscript', '/app/solution.R'],
    },
    perl: {
        image: 'perl:5.36',
        run: ['perl', '/app/solution.pl'],
    },
    typescript: {
        image: 'node:18',
        compile: ['tsc', '/app/solution.ts'],
        run: ['node', '/app/solution.js'],
    },
    haskell: {
        image: 'haskell:9.6',
        compile: ['ghc', '/app/solution.hs', '-o', '/app/solution'],
        run: ['/app/solution'],
    },
};

@Injectable()
export class SubmissionsService {
    async runTestCases(
        language: Language,
        code: string,
        testCases: {
            input: string;
            output: string;
        }[],
    ) {
        const results: ExecutionResult[] = [];
        for (const testCase of testCases) {
            const result = await this.executeCode(
                language,
                code,
                testCase.input,
                testCase.output,
            );
            results.push(result);
        }
        return results;
    }

    private async executeCode(
        language: string,
        code: string,
        input: string,
        expectedOutput: string,
        timeout: number = 30000,
    ): Promise<ExecutionResult> {
        if (!LANG_CONFIGS[language]) {
            return { success: false, output: 'Unsupported language' };
        }

        const tempDir = path.join(__dirname, 'sandbox');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const fileExtension = {
            cpp: 'cpp',
            python: 'py',
            java: 'java',
            javascript: 'js',
        }[language];

        const fileName = language === 'java' ? 'Solution' : 'solution';
        const filePath = path.join(tempDir, `${fileName}.${fileExtension}`);

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, code);

        const dockerArgs = [
            'run',
            '--rm',
            '--network=none',
            '--memory=128m',
            '--cpus=0.5',
            '--pids-limit=50',
            '-v',
            `${tempDir}:/app`,
            LANG_CONFIGS[language].image,
        ];

        return new Promise((resolve) => {
            const compileCommand = LANG_CONFIGS[language].compile;
            const runCommand = LANG_CONFIGS[language].run;

            const executeProcess = (
                command: string[],
                callback: (result: ExecutionResult) => void,
            ) => {
                try {
                    const fullCommand = input
                        ? ['sh', '-c', `echo "${input}" | ${command.join(' ')}`]
                        : command;

                    const process = spawn('docker', [
                        ...dockerArgs,
                        ...fullCommand,
                    ]);

                    let output = '';
                    let errorOutput = '';

                    process.stdin.write(input + '\n');
                    process.stdin.end();

                    process.stdout.on(
                        'data',
                        (data) => (output += data.toString()),
                    );
                    process.stderr.on(
                        'data',
                        (data) => (errorOutput += data.toString()),
                    );

                    process.on('close', (code) => {
                        callback({
                            success:
                                code === 0 &&
                                expectedOutput.trim() === output.trim(),
                            output: output || errorOutput,
                        });
                    });

                    const timer = setTimeout(() => {
                        process.kill();
                        callback({
                            success: false,
                            output: 'Time Limit Exceeded',
                        });
                    }, timeout);
                    process.on('close', () => clearTimeout(timer));
                } catch (error) {
                    console.error(error);
                    callback({
                        success: false,
                        output: 'Something went wrong',
                    });
                }
            };

            if (compileCommand) {
                executeProcess(compileCommand, (compileResult) => {
                    if (!compileResult.success) {
                        resolve({
                            success: false,
                            output:
                                'Compilation Error: ' + compileResult.output,
                        });
                    } else {
                        executeProcess(runCommand, resolve);
                    }
                });
            } else {
                executeProcess(runCommand, resolve);
            }
        });
    }
}
