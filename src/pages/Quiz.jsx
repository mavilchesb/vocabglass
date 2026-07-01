import { useEffect, useMemo, useState } from 'react';
import QuizCard from '../components/QuizCard';
import AnswerInput from '../components/AnswerInput';
import vocabularyData from '../data/vocabulary.json';
import normalizeText from '../utils/normalizeText';
import filterWords from '../utils/filterWords';
import shuffleArray from '../utils/shuffleArray';
import MultipleChoice from '../components/MultipleChoice';
import getRandomOptions from '../utils/getRandomOptions';
import { AnimatePresence, motion } from 'framer-motion';
import { getWordProgress, recordResult } from '../utils/progressManager';
import getAcceptedEnglishVariants from '../utils/spellingVariants';
import FeedbackBar from '../components/FeedbackBar';
import { useHighlightedExamples } from '../hooks/useHighlightedExamples';

function Quiz({ quizSettings, onFinish, onExit, spacedRepetition }) {
    const vocabulary = vocabularyData.vocabulary;

    const quizWords = useMemo(() => {
        const filteredWords = filterWords(vocabulary, quizSettings);

        if (!spacedRepetition) {
            return shuffleArray(filteredWords).slice(
                0,
                quizSettings.questionCount,
            );
        }

        const difficult = filteredWords.filter((w) => {
            const p = getWordProgress(w.id);
            return p.score <= -1 && p.wrong >= 3;
        });

        const rest = filteredWords.filter((w) => {
            const p = getWordProgress(w.id);
            return !(p.score <= -1 && p.wrong >= 3);
        });

        return [...shuffleArray(difficult), ...shuffleArray(rest)].slice(
            0,
            quizSettings.questionCount,
        );
    }, [vocabulary, quizSettings, spacedRepetition]);

    const QUIZ_SIZE = quizWords.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentWord =
        quizWords[currentQuestionIndex] || quizWords[QUIZ_SIZE - 1];

    const { highlightedExample, highlightedExampleEs } = useHighlightedExamples(
        currentWord || {},
    );

    const multipleChoiceOptions = useMemo(() => {
        if (!currentWord) return [];
        return getRandomOptions(
            currentWord,
            vocabulary,
            quizSettings.answerLanguage,
        );
    }, [currentWord, vocabulary, quizSettings.answerLanguage]);

    const [userAnswer, setUserAnswer] = useState('');

    const [feedback, setFeedback] = useState('');

    const [isCorrect, setIsCorrect] = useState(false);

    const [showAnswer, setShowAnswer] = useState(false);

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [wrongAnswers, setWrongAnswers] = useState(0);

    const [selectedOption, setSelectedOption] = useState('');

    const [currentStreak, setCurrentStreak] = useState(0);

    const [bestStreak, setBestStreak] = useState(0);

    const [showStreakPopup, setShowStreakPopup] = useState(false);

    const [streakMessage, setStreakMessage] = useState('');

    const increaseStreak = () => {
        const newStreak = currentStreak + 1;

        setCurrentStreak(newStreak);

        if (newStreak > bestStreak) {
            setBestStreak(newStreak);
        }

        triggerStreakPopup(newStreak);
    };

    const resetStreak = () => {
        setCurrentStreak(0);
    };

    const triggerStreakPopup = (streak) => {
        if (streak === 5) {
            setStreakMessage('STREAK x5');
        } else if (streak === 10) {
            setStreakMessage('STREAK x10');
        } else if (streak === 15) {
            setStreakMessage('STREAK x15');
        } else if (streak === 20) {
            setStreakMessage('UNSTOPPABLE');
        } else {
            return;
        }

        setShowStreakPopup(true);

        setTimeout(() => {
            setShowStreakPopup(false);
        }, 2200);
    };

    const handleNextWord = () => {
        setSelectedOption('');

        setCurrentQuestionIndex((prev) => prev + 1);

        setUserAnswer('');

        setFeedback('');

        setShowAnswer(false);

        setAnswerSubmitted(false);
    };

    const handleCheckAnswer = () => {
        if (answerSubmitted) return;

        const normalizedAnswer = normalizeText(userAnswer);

        if (normalizedAnswer === '') {
            setFeedback('⚠ Please enter an answer.');
            return;
        }

        if (quizSettings.answerLanguage === 'en') {
            const validEnglishAnswers = getAcceptedEnglishVariants(
                currentWord.word,
            ).map(normalizeText);

            if (validEnglishAnswers.includes(normalizedAnswer)) {
                setFeedback('✅ Correct!');
                setCorrectAnswers((prev) => prev + 1);
                increaseStreak();
                recordResult(currentWord.id, true);
                setIsCorrect(true);
            } else {
                setFeedback(`❌ Correct answer: ${currentWord.word}`);
                setWrongAnswers((prev) => prev + 1);
                resetStreak();
                recordResult(currentWord.id, false);
                setIsCorrect(false);
            }
        } else {
            const validAnswers = currentWord.acceptedAnswers.map((answer) =>
                normalizeText(answer),
            );

            if (validAnswers.includes(normalizedAnswer)) {
                setFeedback('✅ Correct!');
                setCorrectAnswers((prev) => prev + 1);
                increaseStreak();
                recordResult(currentWord.id, true);
                setIsCorrect(true);
            } else {
                setFeedback(`❌ Correct answer: ${currentWord.displayMeaning}`);
                setWrongAnswers((prev) => prev + 1);
                resetStreak();
                recordResult(currentWord.id, false);
                setIsCorrect(false);
            }
        }

        setShowAnswer(true);
        setAnswerSubmitted(true);
    };

    const handleSelectOption = (option) => {
        if (answerSubmitted) return;

        setSelectedOption(option);

        const correctOption =
            quizSettings.answerLanguage === 'en'
                ? currentWord.word
                : currentWord.displayMeaning;

        if (option === correctOption) {
            setFeedback('✅ Correct!');
            setCorrectAnswers((prev) => prev + 1);
            increaseStreak();
            recordResult(currentWord.id, true);
            setIsCorrect(true);
        } else {
            setFeedback(`❌ Correct answer: ${correctOption}`);
            setWrongAnswers((prev) => prev + 1);
            resetStreak();
            recordResult(currentWord.id, false);
            setIsCorrect(false);
        }

        setShowAnswer(true);
        setAnswerSubmitted(true);
    };

    const handleSkip = () => {
        const correctOption =
            quizSettings.answerLanguage === 'en'
                ? currentWord.word
                : currentWord.displayMeaning;

        setFeedback(`❌ Correct answer: ${correctOption}`);
        setWrongAnswers((prev) => prev + 1);
        resetStreak();
        setShowAnswer(true);
        setAnswerSubmitted(true);
        recordResult(currentWord.id, false);
        setIsCorrect(false);
    };

    useEffect(() => {
        if (QUIZ_SIZE === 0) {
            return;
        }

        if (currentQuestionIndex < QUIZ_SIZE) {
            return;
        }

        const accuracyPercentage = Math.round(
            (correctAnswers / QUIZ_SIZE) * 100,
        );

        onFinish({
            correctAnswers,
            wrongAnswers,
            accuracyPercentage,
            bestStreak,
        });
    }, [
        currentQuestionIndex,
        QUIZ_SIZE,
        correctAnswers,
        wrongAnswers,
        onFinish,
        bestStreak,
    ]);

    if (QUIZ_SIZE === 0) {
        return (
            <main className='flex min-h-screen items-center justify-center px-6'>
                <div className='w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-lg'>
                    <h1 className='mb-4 text-4xl font-bold text-red-400'>
                        No Words Found 😢
                    </h1>

                    <p className='mb-8 text-slate-300'>
                        Try changing the category, difficulty, or word type.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className='flex min-h-screen flex-col items-center px-6 py-10'>
            <AnimatePresence>
                {showStreakPopup && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -30,
                            scale: 0.85,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: [1, 1.08, 1],
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className='fixed top-24 left-1/2 z-50 -translate-x-1/2'
                    >
                        <div className='relative'>
                            <div className='absolute inset-0 rounded-[28px] bg-cyan-400/15 blur-3xl' />

                            <div className='relative rounded-[28px] border border-cyan-400/15 bg-white/[0.04] px-10 py-7 shadow-[0_20px_80px_rgba(0,211,243,0.15)] backdrop-blur-2xl'>
                                <p className='mb-2 text-center text-5xl'>🔥</p>

                                <p className='text-center text-xs tracking-[0.35em] text-cyan-300 uppercase'>
                                    On Fire
                                </p>

                                <p className='mt-2 text-center text-3xl font-black text-white'>
                                    {streakMessage}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='flex w-full max-w-5xl flex-col gap-8'>
                <header className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl'>
                    <div className='grid items-center gap-6 lg:grid-cols-[1fr_2fr_1fr]'>
                        {/* LEFT */}

                        <button
                            onClick={onExit}
                            className='justify-self-start text-left transition-opacity hover:opacity-80'
                        >
                            <h1 className='text-3xl font-black tracking-[-0.04em] text-white'>
                                Vocab
                                <span className='bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-500 bg-clip-text text-transparent'>
                                    Glass
                                </span>
                            </h1>
                        </button>

                        {/* CENTER */}

                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between text-sm'>
                                <span className='mb-2 text-sm tracking-[0.2em] text-slate-500 uppercase'>
                                    Question {currentQuestionIndex + 1} of{' '}
                                    {QUIZ_SIZE}
                                </span>

                                <span className='mb-2 text-sm tracking-[0.2em] text-slate-500 uppercase'>
                                    {Math.round(
                                        (currentQuestionIndex / QUIZ_SIZE) *
                                            100,
                                    )}
                                    %
                                </span>
                            </div>

                            <div className='h-2 overflow-hidden rounded-full bg-white/[0.06]'>
                                <div
                                    className='h-full rounded-full bg-gradient-to-r from-cyan-300/60 to-cyan-400/30 transition-all duration-500'
                                    style={{
                                        width: `${
                                            (currentQuestionIndex / QUIZ_SIZE) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* RIGHT */}

                        <div className='justify-self-end'>
                            <div className='flex items-center gap-2'>
                                <span className='text-lg'>🔥</span>

                                <span className='text-xl font-semibold text-white'>
                                    {currentStreak}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className='flex w-full flex-col items-center gap-6'>
                    <QuizCard
                        wordData={currentWord}
                        showAnswer={showAnswer}
                        answerLanguage={quizSettings.answerLanguage}
                    />

                    {quizSettings.mode === 'write' ? (
                        <AnswerInput
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                            handleCheckAnswer={handleCheckAnswer}
                            answerSubmitted={answerSubmitted}
                            feedback={feedback}
                        />
                    ) : (
                        <MultipleChoice
                            options={multipleChoiceOptions}
                            handleSelectOption={handleSelectOption}
                            answerSubmitted={answerSubmitted}
                            selectedOption={selectedOption}
                            correctAnswer={
                                quizSettings.answerLanguage === 'en'
                                    ? currentWord.word
                                    : currentWord.displayMeaning
                            }
                        />
                    )}
                </div>

                <div className='flex w-full max-w-2xl gap-4 self-center'>
                    {!answerSubmitted && (
                        <>
                            <button
                                onClick={handleSkip}
                                className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-white/[0.06]'
                            >
                                I Don't Know
                            </button>

                            {quizSettings.mode === 'write' && (
                                <button
                                    onClick={handleCheckAnswer}
                                    className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.05] py-4 font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-white/[0.08]'
                                >
                                    Check Answer
                                </button>
                            )}
                        </>
                    )}
                </div>

                <AnimatePresence>
                    {answerSubmitted && (
                        <FeedbackBar
                            isCorrect={isCorrect}
                            wordData={currentWord}
                            answerLanguage={quizSettings.answerLanguage}
                            highlightedExample={highlightedExample}
                            highlightedExampleEs={highlightedExampleEs}
                            onContinue={handleNextWord}
                        />
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

export default Quiz;
