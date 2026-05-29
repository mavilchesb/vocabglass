import { useEffect, useMemo, useState } from 'react';

import QuizCard from '../components/QuizCard';
import AnswerInput from '../components/AnswerInput';
import ScoreBoard from '../components/ScoreBoard';

import vocabularyData from '../data/vocabulary.json';

import normalizeText from '../utils/normalizeText';

import filterWords from '../utils/filterWords';
import shuffleArray from '../utils/shuffleArray';

import MultipleChoice from '../components/MultipleChoice';
import getRandomOptions from '../utils/getRandomOptions';

function Quiz({ quizSettings, onFinish }) {
    const vocabulary = vocabularyData.vocabulary;

    const quizWords = useMemo(() => {
        const filteredWords = filterWords(vocabulary, quizSettings);

        return shuffleArray(filteredWords).slice(0, quizSettings.questionCount);
    }, [vocabulary, quizSettings]);

    const QUIZ_SIZE = quizWords.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentWord =
        quizWords[currentQuestionIndex] || quizWords[QUIZ_SIZE - 1];

    const multipleChoiceOptions = useMemo(() => {
        return getRandomOptions(currentWord, vocabulary);
    }, [currentWord, vocabulary]);

    const [userAnswer, setUserAnswer] = useState('');

    const [feedback, setFeedback] = useState('');

    const [showAnswer, setShowAnswer] = useState(false);

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [wrongAnswers, setWrongAnswers] = useState(0);

    const [selectedOption, setSelectedOption] = useState('');

    const handleNextWord = () => {
        setSelectedOption(null);

        setCurrentQuestionIndex((prev) => prev + 1);

        setUserAnswer('');

        setFeedback('');

        setShowAnswer(false);

        setAnswerSubmitted(false);
    };

    const handleCheckAnswer = () => {
        if (answerSubmitted) {
            return;
        }

        const normalizedAnswer = normalizeText(userAnswer);

        const validAnswers = currentWord.acceptedAnswers.map((answer) =>
            normalizeText(answer),
        );

        if (normalizedAnswer === '') {
            setFeedback('⚠ Please enter an answer.');

            return;
        }

        if (validAnswers.includes(normalizedAnswer)) {
            setFeedback('✅ Correct!');

            setCorrectAnswers((prev) => prev + 1);
        } else {
            setFeedback(`❌ Correct answer: ${currentWord.displayMeaning}`);

            setWrongAnswers((prev) => prev + 1);
        }

        setShowAnswer(true);

        setAnswerSubmitted(true);
    };

    const handleSelectOption = (selectedOption) => {
        if (answerSubmitted) {
            return;
        }

        setSelectedOption(selectedOption);

        if (selectedOption === currentWord.displayMeaning) {
            setFeedback('✅ Correct!');

            setCorrectAnswers((prev) => prev + 1);
        } else {
            setFeedback(`❌ Correct answer: ${currentWord.displayMeaning}`);

            setWrongAnswers((prev) => prev + 1);
        }

        setShowAnswer(true);

        setAnswerSubmitted(true);
    };

    useEffect(() => {
        if (currentQuestionIndex < QUIZ_SIZE) {
            return;
        }

        const accuracyPercentage = Math.round(
            (correctAnswers / QUIZ_SIZE) * 100,
        );

        const finalMessage =
            accuracyPercentage >= 90
                ? '🔥 Outstanding work! Your English skills are getting really strong.'
                : accuracyPercentage >= 75
                  ? "👏 Great job! You're progressing very well. Keep going!"
                  : accuracyPercentage >= 50
                    ? '💪 Nice effort! Practice consistently and your accuracy will improve quickly.'
                    : "🚀 Every expert starts somewhere. Keep practicing — you're building real progress.";

        onFinish({
            correctAnswers,
            wrongAnswers,
            accuracyPercentage,
            finalMessage,
        });
    }, [
        currentQuestionIndex,
        QUIZ_SIZE,
        correctAnswers,
        wrongAnswers,
        onFinish,
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
            <div className='flex w-full max-w-5xl flex-col gap-8'>
                <ScoreBoard
                    correctAnswers={correctAnswers}
                    wrongAnswers={wrongAnswers}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={QUIZ_SIZE}
                />

                <p className='text-sm tracking-[0.2em] text-slate-500 uppercase'>
                    Question {currentQuestionIndex + 1} / {QUIZ_SIZE}
                </p>

                <div
                    key={currentQuestionIndex}
                    className='flex w-full flex-col items-center gap-6'
                >
                    <QuizCard
                        wordData={currentWord}
                        showAnswer={showAnswer}
                        quizMode={quizSettings.mode}
                    />

                    {quizSettings.mode === 'write' ? (
                        <AnswerInput
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                            handleCheckAnswer={handleCheckAnswer}
                            answerSubmitted={answerSubmitted}
                        />
                    ) : (
                        <MultipleChoice
                            options={multipleChoiceOptions}
                            handleSelectOption={handleSelectOption}
                            answerSubmitted={answerSubmitted}
                            selectedOption={selectedOption}
                            correctAnswer={currentWord.displayMeaning}
                        />
                    )}
                </div>

                <div className='flex w-full max-w-2xl gap-4 self-center'>
                    {!answerSubmitted ? (
                        <>
                            <button
                                onClick={() => {
                                    setFeedback(
                                        `❌ Correct answer: ${currentWord.displayMeaning}`,
                                    );

                                    setWrongAnswers((prev) => prev + 1);

                                    setShowAnswer(true);

                                    setAnswerSubmitted(true);
                                }}
                                className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.06]'
                            >
                                I Don't Know
                            </button>

                            {quizSettings.mode === 'write' && (
                                <button
                                    onClick={handleCheckAnswer}
                                    className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.05] py-4 font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.08]'
                                >
                                    Check Answer
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={handleNextWord}
                            className='w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] py-4 font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.08]'
                        >
                            Next Word →
                        </button>
                    )}
                </div>

                {feedback && quizSettings.mode === 'write' && (
                    <div
                        className={`w-full max-w-2xl self-center rounded-2xl border p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl ${
                            feedback.includes('✅')
                                ? `border-emerald-400/20 bg-emerald-500/[0.08]`
                                : `border-red-400/20 bg-red-500/[0.08]`
                        } `}
                    >
                        <div className='flex items-center gap-4'>
                            <div
                                className={`text-2xl ${
                                    feedback.includes('✅')
                                        ? 'text-emerald-300'
                                        : 'text-red-300'
                                } `}
                            >
                                {feedback.includes('✅') ? '✔' : '✖'}
                            </div>

                            <div>
                                <p className='font-semibold text-white'>
                                    {feedback.includes('✅')
                                        ? 'Correct Answer'
                                        : 'Incorrect Answer'}
                                </p>

                                <p className='mt-1 text-slate-400'>
                                    {feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Quiz;
