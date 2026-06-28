import shuffleArray from './shuffleArray';

function getRandomOptions(currentWord, vocabulary, answerLanguage = 'es') {
    const wrongOptions = vocabulary
        .filter((word) => word.id !== currentWord.id)
        .filter((word) => word.displayMeaning !== currentWord.displayMeaning);

    const shuffledWrongOptions = shuffleArray(wrongOptions);

    const selectedWrongOptions = shuffledWrongOptions
        .slice(0, 3)
        .map((word) =>
            answerLanguage === 'en' ? word.word : word.displayMeaning,
        );

    const correctOption =
        answerLanguage === 'en' ? currentWord.word : currentWord.displayMeaning;

    const options = [correctOption, ...selectedWrongOptions];

    return shuffleArray(options);
}

export default getRandomOptions;
