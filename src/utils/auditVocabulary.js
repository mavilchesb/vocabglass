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

const REGISTER_DICTIONARY = {
    // Informal — incompatible con academic y business
    gonna: 'informal',
    wanna: 'informal',
    gotta: 'informal',
    kinda: 'informal',
    sorta: 'informal',
    nope: 'informal',
    yep: 'informal',
    yeah: 'informal',
    chill: 'informal',
    dude: 'informal',
    stuff: 'informal',
    awesome: 'informal',
    bucks: 'informal',
    crash: 'informal',
    freak: 'informal',
    brag: 'informal',
    dump: 'informal',
    snob: 'informal',
    lousy: 'informal',
    nuts: 'informal',

    // Slang — incompatible con academic y business
    lit: 'slang',
    slay: 'slang',
    vibe: 'slang',
    flex: 'slang',
    ghosting: 'slang',
    ghost: 'slang',
    lowkey: 'slang',
    highkey: 'slang',
    salty: 'slang',
    savage: 'slang',
    extra: 'slang',
    basic: 'slang',
    sus: 'slang',
    cap: 'slang',
    woke: 'slang',
    hyped: 'slang',
    stan: 'slang',
    finsta: 'slang',
    tea: 'slang',
    shade: 'slang',

    // Formal — incompatible con slang
    commence: 'formal',
    endeavour: 'formal',
    endeavor: 'formal',
    henceforth: 'formal',
    whereby: 'formal',
    thereof: 'formal',
    notwithstanding: 'formal',
    hitherto: 'formal',
    forthwith: 'formal',
    albeit: 'formal',
    peruse: 'formal',
    ascertain: 'formal',
    cognizant: 'formal',
    expedite: 'formal',
    pursuant: 'formal',
    remuneration: 'formal',
    acquiesce: 'formal',
    substantiate: 'formal',
};

const REGISTER_CONFLICTS = {
    informal: ['academic', 'business'],
    slang: ['academic', 'business'],
    formal: ['slang'],
};

const DIFFICULTY_DICTIONARY = {
    // Palabras que nunca deberían ser hard
    easy: [
        'book',
        'cat',
        'dog',
        'run',
        'eat',
        'big',
        'small',
        'good',
        'bad',
        'day',
        'night',
        'house',
        'car',
        'food',
        'water',
        'time',
        'year',
        'work',
        'play',
        'help',
        'open',
        'close',
        'start',
        'stop',
        'come',
        'go',
        'see',
        'say',
        'get',
        'make',
        'know',
        'think',
        'take',
        'give',
    ],

    // Palabras que nunca deberían ser easy
    hard: [
        'ephemeral',
        'ubiquitous',
        'esoteric',
        'perfidious',
        'loquacious',
        'sycophant',
        'obfuscate',
        'recalcitrant',
        'perspicacious',
        'mellifluous',
        'pusillanimous',
        'magnanimous',
        'equivocate',
        'superfluous',
        'nefarious',
        'truculent',
        'obstreperous',
        'garrulous',
        'laconic',
        'insidious',
        'pernicious',
        'mendacious',
        'querulous',
        'sanguine',
        'mercurial',
        'vicarious',
        'egregious',
        'acrimonious',
        'perfunctory',
        'tendentious',
    ],
};

const SEMANTIC_ANTONYMS = [
    ['save', 'spend'],
    ['win', 'lose'],
    ['succeed', 'fail'],
    ['start', 'stop'],
    ['open', 'close'],
    ['remember', 'forget'],
    ['love', 'hate'],
    ['buy', 'sell'],
    ['give', 'take'],
    ['increase', 'decrease'],
    ['improve', 'worsen'],
    ['accept', 'reject'],
    ['arrive', 'leave'],
    ['agree', 'disagree'],
    ['add', 'remove'],
    ['create', 'destroy'],
    ['happy', 'sad'],
    ['rich', 'poor'],
    ['strong', 'weak'],
    ['clean', 'dirty'],
    ['safe', 'dangerous'],
    ['fast', 'slow'],
    ['early', 'late'],
    ['hard', 'easy'],
    ['include', 'exclude'],
    ['praise', 'criticize'],
    ['push', 'pull'],
    ['raise', 'lower'],
    ['trust', 'doubt'],
    ['allow', 'forbid'],
];

const WORDTYPE_DICTIONARY = {
    // Adverbs incorrectly marked as noun
    also: 'adverb',
    anyway: 'adverb',
    anymore: 'adverb',
    else: 'adverb',
    briefly: 'adverb',

    // Prepositions incorrectly marked as noun
    among: 'preposition',
    after: 'preposition',
    before: 'preposition',
    against: 'preposition',

    // Adjectives incorrectly marked as noun
    angriest: 'adjective',
    bald: 'adjective',
    brave: 'adjective',
    entire: 'adjective',
    both: 'adjective',

    // Verbs incorrectly marked as noun
    cannot: 'verb',
    could: 'verb',
    delete: 'verb',
    ensure: 'verb',
    draw: 'verb',
    blow: 'verb',
    drop: 'verb',
    creep: 'verb',

    // Nouns incorrectly marked as other types
    dragonfly: 'noun',
    firefly: 'noun',
    jellyfish: 'noun',

    // Adverbs incorrectly marked as noun
    even: 'adverb',
    instead: 'adverb',

    // Adjectives incorrectly marked as noun or adverb
    glad: 'adjective',
    holy: 'adjective',
    homeless: 'adjective',
    insane: 'adjective',

    // Verbs incorrectly marked as noun
    felt: 'verb',
    fit: 'verb',
    hurt: 'verb',

    // Prepositions incorrectly marked as noun
    into: 'preposition',

    // Expressions incorrectly marked as noun
    aint: 'expression',
    gotta: 'expression',

    // Verbs incorrectly marked as noun
    leave: 'verb',
    make: 'verb',
    match: 'verb',
    outsource: 'verb',
    postpone: 'verb',
    provide: 'verb',
    release: 'verb',
    save: 'verb',
    show: 'verb',
    spent: 'verb',
    stand: 'verb',
    streamline: 'verb',
    submit: 'verb',
    summon: 'verb',
    surround: 'verb',
    throw: 'verb',
    told: 'verb',
    wonder: 'verb',

    // Adjectives incorrectly marked as noun
    loud: 'adjective',
    overwhelming: 'adjective',
    redundant: 'adjective',
    remaining: 'adjective',
    risky: 'adjective',
    rude: 'adjective',
    safe: 'adjective',
    salty: 'adjective',
    same: 'adjective',
    straightforward: 'adjective',
    subsequent: 'adjective',
    such: 'adjective',
    wealthy: 'adjective',
    'well-known': 'adjective',

    // Adverbs incorrectly marked as noun
    regardless: 'adverb',
    still: 'adverb',

    // Prepositions incorrectly marked as noun
    towards: 'preposition',

    // Verb incorrectly marked as adjective
    want: 'verb',
};

export default function auditVocabulary(vocabulary) {
    const errors = [];
    const warnings = [];
    const infos = [];

    const seenIds = new Set();
    const seenWords = new Map();

    vocabulary.forEach((item) => {
        const prevErrors = errors.length;
        const prevWarnings = warnings.length;
        const prevInfos = infos.length;

        // Duplicate ID
        if (seenIds.has(item.id)) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'id',
                currentValue: item.id,
                suggestedValue: 'Assign a unique ID',
                reason: 'Duplicate ID detected in dataset.',
            });
        }

        seenIds.add(item.id);

        // Duplicate word
        const normalizedWord = item.word?.trim().toLowerCase();

        if (seenWords.has(normalizedWord)) {
            const existingMeaning = seenWords.get(normalizedWord);

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
            seenWords.set(normalizedWord, item.displayMeaning);
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

        // Meaning
        if (!item.displayMeaning?.trim()) {
            errors.push({
                severity: 'critical',
                word: item.word,
                field: 'displayMeaning',
                currentValue: '(empty)',
                suggestedValue: 'Add a meaning',
                reason: 'Word has no meaning.',
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
                        ?.toLowerCase()
                        .includes(highlight.toLowerCase())
                ) {
                    warnings.push({
                        severity: 'warning',
                        word: item.word,
                        field: 'exampleHighlight',
                        currentValue: highlight,
                        suggestedValue: 'Review manually',
                        reason: 'Highlight not found in example sentence.',
                    });
                }
            });
        }

        // Example quality
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
        } else if (wordCount <= 4) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'example',
                currentValue: `${wordCount} words`,
                suggestedValue: '3+ words',
                reason: 'Example is too short.',
            });
        } else if (wordCount > 15) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'example',
                currentValue: `${wordCount} words`,
                suggestedValue: '3–15 words',
                reason: 'Example is too long.',
            });
        }

        // Category-Example consistency
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

        // Category-Word consistency
        Object.entries(CATEGORY_WORDS).forEach(
            ([expectedCategory, categoryWords]) => {
                if (
                    categoryWords.includes(item.word?.trim().toLowerCase()) &&
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
            },
        );

        // Register Detection
        const wordRegister = REGISTER_DICTIONARY[normalizedWord];

        if (wordRegister) {
            const conflictingCategories =
                REGISTER_CONFLICTS[wordRegister] || [];

            if (conflictingCategories.includes(item.category)) {
                warnings.push({
                    severity: 'warning',
                    word: item.word,
                    field: 'category',
                    currentValue: item.category,
                    suggestedValue:
                        wordRegister === 'formal'
                            ? 'academic or business'
                            : 'slang or everyday-english',
                    reason: `Word has ${wordRegister} register, inconsistent with "${item.category}" category.`,
                });
            }
        }

        // Difficulty Consistency
        if (
            DIFFICULTY_DICTIONARY.easy.includes(normalizedWord) &&
            item.difficulty === 'hard'
        ) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'difficulty',
                currentValue: 'hard',
                suggestedValue: 'easy',
                reason: 'Very common word marked as hard.',
            });
        }

        if (
            DIFFICULTY_DICTIONARY.hard.includes(normalizedWord) &&
            item.difficulty === 'easy'
        ) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'difficulty',
                currentValue: 'easy',
                suggestedValue: 'hard',
                reason: 'Advanced word marked as easy.',
            });
        }

        // Semantic Consistency
        const meaningText = item.displayMeaning?.toLowerCase() || '';
        const exampleLower = item.example?.toLowerCase() || '';

        SEMANTIC_ANTONYMS.forEach(([wordA, wordB]) => {
            const meaningHasA = meaningText.includes(wordA);
            const meaningHasB = meaningText.includes(wordB);
            const exampleHasA = exampleLower.includes(wordA);
            const exampleHasB = exampleLower.includes(wordB);

            if (meaningHasA && exampleHasB) {
                warnings.push({
                    severity: 'warning',
                    word: item.word,
                    field: 'example',
                    currentValue: item.example,
                    suggestedValue: 'Review manually',
                    reason: `Semantic conflict: meaning contains "${wordA}" but example contains "${wordB}".`,
                });
            }

            if (meaningHasB && exampleHasA) {
                warnings.push({
                    severity: 'warning',
                    word: item.word,
                    field: 'example',
                    currentValue: item.example,
                    suggestedValue: 'Review manually',
                    reason: `Semantic conflict: meaning contains "${wordB}" but example contains "${wordA}".`,
                });
            }
        });

        // Long meaning / accepted answers
        const meaningWordCount =
            item.displayMeaning?.trim().split(/\s+/).length || 0;

        if (meaningWordCount > 4) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'displayMeaning',
                currentValue: item.displayMeaning,
                suggestedValue: 'Shorten to 4 words or less',
                reason: `Meaning is ${meaningWordCount} words long. Too long for a typing quiz.`,
            });
        }

        if (Array.isArray(item.acceptedAnswers)) {
            item.acceptedAnswers.forEach((answer) => {
                const answerWordCount = answer.trim().split(/\s+/).length;

                if (answerWordCount > 4) {
                    warnings.push({
                        severity: 'warning',
                        word: item.word,
                        field: 'acceptedAnswers',
                        currentValue: answer,
                        suggestedValue: 'Shorten to 4 words or less',
                        reason: `Answer "${answer}" is ${answerWordCount} words long. Too long for a typing quiz.`,
                    });
                }
            });
        }

        // WordType Dictionary Validation
        const expectedType = WORDTYPE_DICTIONARY[normalizedWord];

        if (expectedType && item.wordType !== expectedType) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'wordType',
                currentValue: item.wordType,
                suggestedValue: expectedType,
                reason: `"${item.word}" should be ${expectedType}, not ${item.wordType}.`,
            });
        }

        // Tag all new issues with word id and category
        errors.slice(prevErrors).forEach((e) => {
            e.id = item.id;
            e.category = item.category;
        });
        warnings.slice(prevWarnings).forEach((w) => {
            w.id = item.id;
            w.category = item.category;
        });
        infos.slice(prevInfos).forEach((i) => {
            i.id = item.id;
            i.category = item.category;
        });

        // Split phrasal verb highlight
        if (
            Array.isArray(item.exampleHighlight) &&
            item.exampleHighlight.length > 1
        ) {
            warnings.push({
                severity: 'warning',
                word: item.word,
                field: 'exampleHighlight',
                currentValue: item.exampleHighlight.join(', '),
                suggestedValue: `"${item.exampleHighlight.join(' ')}"`,
                reason: 'Highlight is split into multiple strings. Rewrite the example so the phrasal verb appears together.',
            });
        }
    });

    return {
        totalWords: vocabulary.length,
        errors,
        warnings,
        infos,
    };
}
