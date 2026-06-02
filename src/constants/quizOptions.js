import vocabularyData from '../data/vocabulary.json';

export const QUIZ_MODES = [
    {
        value: 'multiple',
        label: 'Multiple Choice',
    },
    {
        value: 'write',
        label: 'Write Answer',
    },
];

export const QUESTION_COUNTS = [10, 15, 20, 25, 30];

export const DIFFICULTIES = ['easy', 'medium', 'hard'];

export const CATEGORIES = [
    ...new Set(vocabularyData.vocabulary.map((word) => word.category)),
].sort();
