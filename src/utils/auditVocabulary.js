export default function auditVocabulary(vocabulary) {
    const errors = [];
    const warnings = [];
    const infos = [];

    const VALID_CATEGORIES = [
        'academic',
        'everyday-english',
        'animal',
        'business',
        'technology',
        'travel',
        'slang',
    ];

    const VALID_WORD_TYPES = [
        'noun',
        'verb',
        'adjective',
        'adverb',
        'phrasal-verb',
        'expression',
        'preposition',
    ];

    const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

    const CATEGORY_KEYWORDS = {
        technology: [
            'software',
            'computer',
            'server',
            'database',
            'algorithm',
            'application',
            'app',
            'internet',
            'system',
            'digital',
        ],

        business: [
            'company',
            'client',
            'contract',
            'meeting',
            'employee',
            'manager',
            'revenue',
            'sales',
            'project',
            'office',
        ],

        travel: [
            'airport',
            'flight',
            'hotel',
            'passport',
            'tourist',
            'trip',
            'journey',
            'vacation',
            'ticket',
            'luggage',
        ],

        animal: [
            'dog',
            'cat',
            'bird',
            'lion',
            'tiger',
            'animal',
            'pet',
            'wildlife',
        ],
    };

    const CATEGORY_WORDS = {
        technology: [
            'server',
            'software',
            'hardware',
            'algorithm',
            'database',
            'app',
            'application',
            'network',
            'programming',
            'developer',
        ],

        business: [
            'revenue',
            'contract',
            'stakeholder',
            'client',
            'meeting',
            'budget',
            'invoice',
            'manager',
            'employee',
            'startup',
        ],

        travel: [
            'airport',
            'passport',
            'luggage',
            'flight',
            'tourist',
            'destination',
            'hotel',
            'itinerary',
            'journey',
            'vacation',
        ],

        animal: [
            'dog',
            'cat',
            'lion',
            'tiger',
            'elephant',
            'bear',
            'wolf',
            'rabbit',
            'bird',
            'fish',
        ],
    };

    const ids = new Set();
    const words = new Map();

    vocabulary.forEach((item) => {
        // Duplicate ID
        if (ids.has(item.id)) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'category',
                currentValue: item.category || '(empty)',
                suggestedValue: 'everyday-english',
                reason: 'Category is required.',
            });
        }

        ids.add(item.id);

        // Duplicate word
        const normalizedWord = item.word?.trim().toLowerCase();

        if (words.has(normalizedWord)) {
            const existingMeaning = words.get(normalizedWord);

            if (existingMeaning === item.displayMeaning) {
                warnings.push({
                    severity: 'warning',
                    word: item.word,
                    field: 'word',
                    currentValue: item.displayMeaning,
                    suggestedValue: 'Remove duplicate entry',
                    reason: 'Exact duplicate meaning detected.',
                });
            } else {
                infos.push({
                    severity: 'info',
                    word: item.word,
                    field: 'displayMeaning',
                    currentValue: item.displayMeaning,
                    suggestedValue: 'Valid polysemous word',
                    reason: `Also appears as "${existingMeaning}".`,
                });
            }
        } else {
            words.set(normalizedWord, item.displayMeaning);
        }

        // Category
        if (!item.category) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'category',
                currentValue: '(empty)',
                suggestedValue: 'everyday-english',
                reason: 'Category is required.',
            });
        } else if (!VALID_CATEGORIES.includes(item.category)) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'category',
                currentValue: item.category,
                suggestedValue: 'Review manually',
                reason: 'Category does not exist.',
            });
        }

        // Word type
        if (!VALID_WORD_TYPES.includes(item.wordType)) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'wordType',
                currentValue: item.wordType,
                suggestedValue: 'Review manually',
                reason: 'Invalid word type.',
            });
        }

        // Difficulty
        if (!VALID_DIFFICULTIES.includes(item.difficulty)) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'difficulty',
                currentValue: item.difficulty,
                suggestedValue: 'easy',
                reason: 'Difficulty must be easy, medium or hard.',
            });
        }

        // Example
        if (!item.example?.trim()) {
            errors.push({
                word: item.word,
                issue: 'Missing example',
            });
        }

        // Meaning
        if (!item.displayMeaning?.trim()) {
            errors.push({
                word: item.word,
                issue: 'Missing meaning',
            });
        }

        // Accepted answers
        if (
            !Array.isArray(item.acceptedAnswers) ||
            item.acceptedAnswers.length === 0
        ) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'acceptedAnswers',
                currentValue: '[]',
                suggestedValue: `[${item.displayMeaning}]`,
                reason: 'At least one accepted answer is required.',
            });
        }

        // Highlight validation
        if (Array.isArray(item.exampleHighlight)) {
            item.exampleHighlight.forEach((highlight) => {
                if (
                    !item.example
                        .toLowerCase()
                        .includes(highlight.toLowerCase())
                ) {
                    warnings.push({
                        severity: 'warning',
                        word: item.word,
                        field: 'word',
                        currentValue: item.word,
                        suggestedValue: 'Remove duplicate entry',
                        reason: 'Duplicate word detected in dataset.',
                    });
                }
            });
        }

        // Example Quality Validation
        const wordCount = item.example?.trim().split(/\s+/).length || 0;

        if (!item.example?.trim()) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'example',
                currentValue: '(empty)',
                suggestedValue: 'Add example sentence',
                reason: 'Word has no example.',
            });
        }

        if (wordCount > 0 && wordCount <= 2) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'example',
                currentValue: `${wordCount} words`,
                suggestedValue: '3+ words',
                reason: 'Example is too short.',
            });
        }

        if (wordCount > 15) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'example',
                currentValue: `${wordCount} words`,
                suggestedValue: '3–15 words',
                reason: 'Example is too long.',
            });
        }

        // Category-Example Consistency Check
        const exampleText = item.example?.toLowerCase() || '';

        Object.entries(CATEGORY_KEYWORDS).forEach(
            ([expectedCategory, keywords]) => {
                const matches = keywords.filter((keyword) =>
                    exampleText.includes(keyword),
                );

                if (matches.length >= 3 && item.category !== expectedCategory) {
                    warnings.push({
                        severity: 'warning',
                        word: item.word,
                        field: 'category',
                        currentValue: item.category,
                        suggestedValue: expectedCategory,
                        reason: `Example contains category indicators: ${matches.join(', ')}`,
                    });
                }
            },
        );

        // Category-Word Consistency Check
        Object.entries(CATEGORY_WORDS).forEach(([expectedCategory, words]) => {
            if (
                words.includes(item.word?.trim().toLowerCase()) &&
                item.category !== expectedCategory
            ) {
                warnings.push({
                    severity: 'warning',
                    word: item.word,
                    field: 'category',
                    currentValue: item.category,
                    suggestedValue: expectedCategory,
                    reason: 'Word strongly suggests another category.',
                });
            }
        });
    });

    return {
        totalWords: vocabulary.length,
        errors,
        warnings,
        infos,
    };
}
