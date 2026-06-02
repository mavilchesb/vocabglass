function filterWords(vocabulary, settings) {
    return vocabulary.filter((word) => {
        const categoryMatch = settings.categories.includes(word.category);

        const difficultyMatch =
            settings.difficulty === 'mixed' ||
            word.difficulty === settings.difficulty;

        return categoryMatch && difficultyMatch;
    });
}

export default filterWords;
