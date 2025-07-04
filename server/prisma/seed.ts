import { PrismaClient, ProblemLevel, Language } from '@prisma/client';

const prisma = new PrismaClient();

const problems = [
    // -------------------- EASY --------------------
    {
        id: 1,
        title: 'Sort Array',
        description:
            'Given an array of integers, return the sorted array in ascending order.',
        testCases: JSON.stringify([
            { input: '9\n3 1 4 1 5 9 2 6 5', output: '1 1 2 3 4 5 5 6 9' },
            { input: '6\n5 2 8 12 1 5', output: '1 2 5 5 8 12' },
            { input: '1\n1', output: '1' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include <vector>
using namespace std;

vector<int> sortArray(vector<int>& nums) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 2,
        title: 'Maximum Element in Array',
        description: 'Given an array of integers, find the maximum element.',
        testCases: JSON.stringify([
            { input: '5\n1 3 2 5 4', output: '5' },
            { input: '5\n-1 -5 -2 -8 -3', output: '-1' },
            { input: '1\n100', output: '100' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include <vector>
using namespace std;

int maxElement(vector<int>& nums) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 3,
        title: 'Check Palindrome',
        description: 'Check whether a given string is a palindrome.',
        testCases: JSON.stringify([
            { input: 'racecar', output: 'true' },
            { input: 'hello', output: 'false' },
            { input: 'madam', output: 'true' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
using namespace std;

bool isPalindrome(string s) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 4,
        title: 'Reverse a String',
        description: 'Given a string, return its reverse.',
        testCases: JSON.stringify([
            { input: 'hello', output: 'olleh' },
            { input: 'world', output: 'dlrow' },
            { input: 'a', output: 'a' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
using namespace std;

string reverseString(string s) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 5,
        title: 'Count Digits',
        description: 'Given an integer, count the number of digits.',
        testCases: JSON.stringify([
            { input: '12345', output: '5' },
            { input: '0', output: '1' },
            { input: '-9876', output: '4' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
using namespace std;

int countDigits(int n) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 6,
        title: 'Sum of Array Elements',
        description:
            'Given an array of integers, return the sum of all elements.',
        testCases: JSON.stringify([
            { input: '5\n1 2 3 4 5', output: '15' },
            { input: '3\n10 20 30', output: '60' },
            { input: '4\n-1 -2 -3 -4', output: '-10' },
        ]),
        level: ProblemLevel.easy,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include <vector>
using namespace std;

int sumArray(vector<int>& nums) {
    // Your code here
}
`.trim(),
        },
    },

    // -------------------- MEDIUM --------------------
    {
        id: 7,
        title: 'Two Sum',
        description:
            'Given an array and a target, return indices of two numbers that add up to the target.',
        testCases: JSON.stringify([
            { input: '4\n2 7 11 15\n9', output: '0 1' },
            { input: '3\n3 2 4\n6', output: '1 2' },
            { input: '2\n3 3\n6', output: '0 1' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<vector>
#include<unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 8,
        title: 'Longest Substring Without Repeating Characters',
        description:
            'Find the length of the longest substring without repeating characters.',
        testCases: JSON.stringify([
            { input: 'abcabcbb', output: '3' },
            { input: 'bbbbb', output: '1' },
            { input: 'pwwkew', output: '3' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<unordered_set>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 9,
        title: 'Valid Parentheses',
        description:
            'Given a string containing brackets, determine if it is valid.',
        testCases: JSON.stringify([
            { input: '()', output: 'true' },
            { input: '()[]{}', output: 'true' },
            { input: '(]', output: 'false' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<stack>
using namespace std;

bool isValid(string s) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 10,
        title: 'Merge Intervals',
        description: 'Given intervals, merge all overlapping ones.',
        testCases: JSON.stringify([
            { input: '3\n1 3\n2 6\n8 10', output: '[1 6] [8 10]' },
            { input: '2\n1 4\n4 5', output: '[1 5]' },
            { input: '2\n1 2\n3 4', output: '[1 2] [3 4]' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<vector>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 11,
        title: 'Subarray Sum Equals K',
        description: 'Find the total number of subarrays that sum to k.',
        testCases: JSON.stringify([
            { input: '5\n1 1 1\n2', output: '2' },
            { input: '5\n1 2 3\n3', output: '2' },
            { input: '3\n1 -1 0\n0', output: '3' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 12,
        title: 'Add Two Numbers',
        description: 'Add two numbers represented by linked lists.',
        testCases: JSON.stringify([
            { input: '2->4->3 + 5->6->4', output: '7->0->8' },
            { input: '0 + 0', output: '0' },
            { input: '9->9->9 + 1', output: '0->0->0->1' },
        ]),
        level: ProblemLevel.medium,
        boilerPlate: {
            language: Language.cpp,
            code: `
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // Your code here
}
`.trim(),
        },
    },

    // -------------------- HARD --------------------
    {
        id: 13,
        title: 'Trapping Rain Water',
        description: 'Given height array, compute how much water it can trap.',
        testCases: JSON.stringify([
            { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', output: '6' },
            { input: '6\n4 2 0 3 2 5', output: '9' },
            { input: '3\n2 0 2', output: '2' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<vector>
using namespace std;

int trap(vector<int>& height) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 14,
        title: 'Median of Two Sorted Arrays',
        description: 'Given two sorted arrays, find the median.',
        testCases: JSON.stringify([
            { input: '2\n1 3\n1\n2', output: '2.0' },
            { input: '2\n1 2\n2\n3 4', output: '2.5' },
            { input: '1\n0\n0\n', output: '0.0' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<iostream>
#include<vector>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 15,
        title: 'N-Queens',
        description: 'Return all distinct solutions to the n-queens puzzle.',
        testCases: JSON.stringify([
            { input: '4', output: '2' },
            { input: '1', output: '1' },
            { input: '2', output: '0' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<vector>
using namespace std;

vector<vector<string>> solveNQueens(int n) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 16,
        title: 'Regular Expression Matching',
        description:
            'Implement regular expression matching with support for "." and "*".',
        testCases: JSON.stringify([
            { input: 'aa\na', output: 'false' },
            { input: 'aa\na*', output: 'true' },
            { input: 'mississippi\nmis*is*p*.', output: 'false' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<string>
using namespace std;

bool isMatch(string s, string p) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 17,
        title: 'Sliding Window Maximum',
        description: 'Find the maximum in each sliding window of size k.',
        testCases: JSON.stringify([
            { input: '8\n1 3 -1 -3 5 3 6 7\n3', output: '3 3 5 5 6 7' },
            { input: '1\n1\n1', output: '1' },
            { input: '2\n9 11\n2', output: '11' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<vector>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    // Your code here
}
`.trim(),
        },
    },
    {
        id: 18,
        title: 'Word Ladder',
        description:
            'Return the length of the shortest transformation sequence from beginWord to endWord.',
        testCases: JSON.stringify([
            {
                input: 'hit\ncog\n["hot","dot","dog","lot","log","cog"]',
                output: '5',
            },
            { input: 'hit\ncog\n["hot","dot","dog","lot","log"]', output: '0' },
            { input: 'a\nc\n["a","b","c"]', output: '2' },
        ]),
        level: ProblemLevel.hard,
        boilerPlate: {
            language: Language.cpp,
            code: `
#include<string>
#include<vector>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    // Your code here
}
`.trim(),
        },
    },
];

async function main() {
    for (const problem of problems) {
        const { boilerPlate, ...problemData } = problem;

        const upsertedProblem = await prisma.problem.upsert({
            where: { id: problem.id },
            update: problemData,
            create: problemData,
        });

        await prisma.boilerPlateCode.upsert({
            where: {
                problemId_language: {
                    problemId: upsertedProblem.id,
                    language: boilerPlate.language,
                },
            },
            update: { code: boilerPlate.code },
            create: {
                problemId: upsertedProblem.id,
                language: boilerPlate.language,
                code: boilerPlate.code,
            },
        });
    }

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
