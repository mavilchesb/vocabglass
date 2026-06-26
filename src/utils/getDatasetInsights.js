const FALSE_FRIENDS = {
    actually: 'en realidad',
    sensible: 'sensato',
    eventually: 'finalmente',
    library: 'biblioteca',
    embarrassed: 'avergonzado',
};

const CATEGORY_TARGETS = {
    easy: 15,
    medium: 15,
    hard: 10,
};

const WORD_TYPE_TARGETS = {
    noun: 80,
    verb: 60,
    adjective: 50,
    'phrasal-verb': 50,
    expression: 30,
    adverb: 20,
    preposition: 10,
};

function getDatasetInsights(vocabulary) {
    const categoryCount = {};
    const difficultyCount = {};
    const wordTypeCount = {};

    let longestExample = '';
    let shortestExample = vocabulary[0]?.example || '';

    const categoryDifficultyMatrix = {};

    vocabulary.forEach((item) => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;

        if (!categoryDifficultyMatrix[item.category]) {
            categoryDifficultyMatrix[item.category] = {
                easy: 0,
                medium: 0,
                hard: 0,
            };
        }

        categoryDifficultyMatrix[item.category][item.difficulty]++;

        difficultyCount[item.difficulty] =
            (difficultyCount[item.difficulty] || 0) + 1;

        wordTypeCount[item.wordType] = (wordTypeCount[item.wordType] || 0) + 1;

        if (item.example.length > longestExample.length) {
            longestExample = item.example;
        }

        if (item.example.length < shortestExample.length) {
            shortestExample = item.example;
        }
    });

    const coverageAnalysis = Object.entries(categoryCount)
        .map(([category, count]) => {
            const stats = categoryDifficultyMatrix[category];

            const missingEasy = Math.max(0, CATEGORY_TARGETS.easy - stats.easy);
            const missingMedium = Math.max(
                0,
                CATEGORY_TARGETS.medium - stats.medium,
            );
            const missingHard = Math.max(0, CATEGORY_TARGETS.hard - stats.hard);

            return {
                category,
                count,
                easy: stats.easy,
                medium: stats.medium,
                hard: stats.hard,
                missingEasy,
                missingMedium,
                missingHard,
                totalMissing: missingEasy + missingMedium + missingHard,
            };
        })
        .sort((a, b) => b.totalMissing - a.totalMissing);

    const totalWords = vocabulary.length;

    const easyPercentage = Math.round(
        ((difficultyCount.easy || 0) / totalWords) * 100,
    );
    const mediumPercentage = Math.round(
        ((difficultyCount.medium || 0) / totalWords) * 100,
    );
    const hardPercentage = Math.round(
        ((difficultyCount.hard || 0) / totalWords) * 100,
    );

    const pedagogicalInsights = [];

    if (easyPercentage < 20) {
        pedagogicalInsights.push({
            severity: 'warning',
            message: 'Beginner vocabulary is underrepresented.',
        });
    }

    if (hardPercentage < 15) {
        pedagogicalInsights.push({
            severity: 'warning',
            message: 'Advanced vocabulary is underrepresented.',
        });
    }

    if (
        easyPercentage >= 20 &&
        mediumPercentage >= 30 &&
        hardPercentage >= 15
    ) {
        pedagogicalInsights.push({
            severity: 'success',
            message: 'CEFR distribution is balanced.',
        });
    }

    coverageAnalysis.forEach((category) => {
        const stats = categoryDifficultyMatrix[category.category];

        if (stats.easy === 0) {
            pedagogicalInsights.push({
                severity: 'warning',
                message: `${category.category} lacks easy vocabulary.`,
            });
        }

        if (stats.medium === 0) {
            pedagogicalInsights.push({
                severity: 'warning',
                message: `${category.category} lacks medium vocabulary.`,
            });
        }

        if (stats.hard === 0) {
            pedagogicalInsights.push({
                severity: 'warning',
                message: `${category.category} lacks hard vocabulary.`,
            });
        }

        if (stats.easy > 0 && stats.medium > 0 && stats.hard > 0) {
            pedagogicalInsights.push({
                severity: 'success',
                message: `${category.category} is well balanced.`,
            });
        }
    });

    coverageAnalysis.forEach((category) => {
        if (category.count < 15) {
            pedagogicalInsights.push({
                severity: 'warning',
                message: `${category.category} is severely underrepresented.`,
            });
        }
    });

    Object.entries(categoryCount).forEach(([category, count]) => {
        const percentage = (count / totalWords) * 100;

        if (percentage > 50) {
            pedagogicalInsights.push({
                severity: 'info',
                message: `${category} represents ${Math.round(percentage)}% of the dataset.`,
            });
        }
    });

    const falseFriendsFound = vocabulary
        .filter((item) => {
            const expectedMeaning = FALSE_FRIENDS[item.word.toLowerCase()];

            if (!expectedMeaning) return false;

            return (
                item.displayMeaning.toLowerCase().trim() !==
                expectedMeaning.toLowerCase().trim()
            );
        })
        .map((item) => ({
            word: item.word,
            expectedMeaning: FALSE_FRIENDS[item.word.toLowerCase()],
            currentMeaning: item.displayMeaning,
        }));

    if (falseFriendsFound.length > 0) {
        pedagogicalInsights.push({
            severity: 'warning',
            message: `${falseFriendsFound.length} false friend issues detected.`,
        });
    }

    const wordTypeCoverageAnalysis = Object.entries(WORD_TYPE_TARGETS)
        .map(([type, target]) => {
            const count = wordTypeCount[type] || 0;
            const percentage = Math.min((count / target) * 100, 100);
            return { type, count, target, percentage };
        })
        .sort((a, b) => a.percentage - b.percentage);

    return {
        categoryCount,
        difficultyCount,
        wordTypeCount,
        longestExample,
        shortestExample,
        coverageAnalysis,
        categoryDifficultyMatrix,
        pedagogicalInsights,
        easyPercentage,
        mediumPercentage,
        hardPercentage,
        falseFriendsFound,
        wordTypeCoverageAnalysis,
    };
}

export default getDatasetInsights;
