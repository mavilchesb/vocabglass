import shuffleArray from './shuffleArray';

function getRandomOptions(currentWord, vocabulary, answerLanguage = 'es') {
    const getLabel = (word) =>
        answerLanguage === 'en' ? word.word : word.displayMeaning;

    const correctLabel = getLabel(currentWord);

    const pool = vocabulary.filter(
        (word) =>
            word.id !== currentWord.id &&
            word.displayMeaning !== currentWord.displayMeaning &&
            !currentWord.acceptedAnswers.includes(word.displayMeaning),
    );

    const sameCategoryAndDifficulty = shuffleArray(
        pool.filter(
            (word) =>
                word.category === currentWord.category &&
                word.difficulty === currentWord.difficulty,
        ),
    );

    const sameCategoryOnly = shuffleArray(
        pool.filter(
            (word) =>
                word.category === currentWord.category &&
                word.difficulty !== currentWord.difficulty,
        ),
    );

    const remaining = shuffleArray(
        pool.filter((word) => word.category !== currentWord.category),
    );

    const prioritized = [
        ...sameCategoryAndDifficulty,
        ...sameCategoryOnly,
        ...remaining,
    ];

    const wrongOptions = prioritized
        .filter((word) => getLabel(word) !== correctLabel)
        .slice(0, 3)
        .map(getLabel);

    return shuffleArray([correctLabel, ...wrongOptions]);
}

export default getRandomOptions;
