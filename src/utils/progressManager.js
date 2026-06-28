const STORAGE_KEY = 'vocabglass_progress';

const MASTERED_CORRECT_THRESHOLD = 5;
const MASTERED_SCORE_THRESHOLD = 3;
const DIFFICULT_WRONG_THRESHOLD = 3;
const DIFFICULT_SCORE_THRESHOLD = -1;
const MIN_SCORE = -5;

function loadProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
        console.error('VocabGlass: could not save progress to localStorage.');
    }
}

export function recordResult(wordId, isCorrect) {
    const progress = loadProgress();

    const current = progress[wordId] || {
        correct: 0,
        wrong: 0,
        score: 0,
        lastSeen: null,
    };

    const updated = {
        correct: current.correct + (isCorrect ? 1 : 0),
        wrong: current.wrong + (isCorrect ? 0 : 1),
        score: Math.max(MIN_SCORE, current.score + (isCorrect ? 1 : -1)),
        lastSeen: Date.now(),
    };

    saveProgress({ ...progress, [wordId]: updated });
}

export function getWordProgress(wordId) {
    const progress = loadProgress();
    return (
        progress[wordId] || {
            correct: 0,
            wrong: 0,
            score: 0,
            lastSeen: null,
        }
    );
}

export function getAllProgress() {
    return loadProgress();
}

export function isMastered(wordProgress) {
    return (
        wordProgress.correct >= MASTERED_CORRECT_THRESHOLD &&
        wordProgress.score >= MASTERED_SCORE_THRESHOLD
    );
}

export function isDifficult(wordProgress) {
    return (
        wordProgress.wrong >= DIFFICULT_WRONG_THRESHOLD &&
        wordProgress.score <= DIFFICULT_SCORE_THRESHOLD
    );
}

export function sortByPriority(vocabulary) {
    const progress = loadProgress();

    return [...vocabulary].sort((a, b) => {
        const pa = progress[a.id] || { score: 0, correct: 0, lastSeen: null };
        const pb = progress[b.id] || { score: 0, correct: 0, lastSeen: null };

        const masteredA =
            pa.correct >= MASTERED_CORRECT_THRESHOLD &&
            pa.score >= MASTERED_SCORE_THRESHOLD;
        const masteredB =
            pb.correct >= MASTERED_CORRECT_THRESHOLD &&
            pb.score >= MASTERED_SCORE_THRESHOLD;

        // Dominadas van al final
        if (masteredA && !masteredB) return 1;
        if (!masteredA && masteredB) return -1;

        // Nunca vistas tienen prioridad media
        const neverA = pa.lastSeen === null;
        const neverB = pb.lastSeen === null;

        if (neverA && !neverB) return -1;
        if (!neverA && neverB) return 1;

        // Ordenar por score ascendente — score más bajo = más prioridad
        return pa.score - pb.score;
    });
}

export function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
}
