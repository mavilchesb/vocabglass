function filterWords(vocabulary, settings) {

    return vocabulary.filter((word) => {

        const categoryMatch =
            settings.category === "mixed" ||
            word.category === settings.category;

        const difficultyMatch =
            settings.difficulty === "mixed" ||
            word.difficulty === settings.difficulty;

        const wordTypeMatch =
            settings.wordType === "mixed" ||
            word.wordType === settings.wordType;

        return (
            categoryMatch &&
            difficultyMatch &&
            wordTypeMatch
        );

    });

}

export default filterWords;