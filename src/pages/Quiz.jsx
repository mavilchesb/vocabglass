import { useMemo, useState } from "react";

import QuizCard from "../components/QuizCard";
import AnswerInput from "../components/AnswerInput";
import ScoreBoard from "../components/ScoreBoard";

import vocabularyData from "../data/vocabulary.json";

import normalizeText from "../utils/normalizeText";

function shuffleArray(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );
}

function Quiz({ onFinish }) {

    const vocabulary = vocabularyData.vocabulary;

    const QUIZ_SIZE = 15;

    const quizWords = useMemo(() => {

        return shuffleArray(vocabulary)
            .slice(0, QUIZ_SIZE);

    }, [vocabulary]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentWord = quizWords[currentQuestionIndex];

    const [userAnswer, setUserAnswer] = useState("");

    const [feedback, setFeedback] = useState("");

    const [showAnswer, setShowAnswer] = useState(false);

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [wrongAnswers, setWrongAnswers] = useState(0);

    const handleNextWord = () => {

        setCurrentQuestionIndex(
            prev => prev + 1
        );

        setUserAnswer("");

        setFeedback("");

        setShowAnswer(false);

        setAnswerSubmitted(false);
    };

    const handleCheckAnswer = () => {

        if (answerSubmitted) {
            return;
        }

        const normalizedAnswer =
            normalizeText(userAnswer);

        const validAnswers =
            currentWord.meaning
                .split("/")
                .map(answer =>
                    normalizeText(answer)
                );

        if (normalizedAnswer === "") {

            setFeedback(
                "⚠ Please enter an answer."
            );

            return;
        }

        if (
            validAnswers.includes(normalizedAnswer)
        ) {

            setFeedback("✅ Correct!");

            setCorrectAnswers(
                prev => prev + 1
            );

        } else {

            setFeedback(
                `❌ Correct answer: ${currentWord.meaning}`
            );

            setWrongAnswers(
                prev => prev + 1
            );
        }

        setShowAnswer(true);

        setAnswerSubmitted(true);
    };

    if (currentQuestionIndex >= QUIZ_SIZE) {

        const accuracyPercentage = Math.round(
            (correctAnswers / QUIZ_SIZE) * 100
        );

        const finalMessage =
            accuracyPercentage >= 90
                ? "🔥 Outstanding work! Your English skills are getting really strong."
                : accuracyPercentage >= 75
                    ? "👏 Great job! You're progressing very well. Keep going!"
                    : accuracyPercentage >= 50
                        ? "💪 Nice effort! Practice consistently and your accuracy will improve quickly."
                        : "🚀 Every expert starts somewhere. Keep practicing — you're building real progress.";

        onFinish({
            correctAnswers,
            wrongAnswers,
            accuracyPercentage,
            finalMessage,
        });

        return null;
    }

    return (

        <main
            className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-6
        gap-6
      "
        >

            <ScoreBoard
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
            />

            <p className="text-slate-400 text-lg">
                Question {currentQuestionIndex + 1} / {QUIZ_SIZE}
            </p>

            <QuizCard
                wordData={currentWord}
                showAnswer={showAnswer}
            />

            <AnswerInput
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                handleCheckAnswer={handleCheckAnswer}
                answerSubmitted={answerSubmitted}
            />

            <div className="w-full max-w-2xl flex gap-4">

                {
                    !answerSubmitted ? (
                        <>

                            <button
                                onClick={() => {

                                    setFeedback(
                                        `❌ Correct answer: ${currentWord.meaning}`
                                    );

                                    setWrongAnswers(
                                        prev => prev + 1
                                    );

                                    setShowAnswer(true);

                                    setAnswerSubmitted(true);
                                }}
                                className="
                  flex-1
                  bg-red-500
                  hover:bg-red-400
                  transition-all
                  duration-300
                  py-4
                  rounded-2xl
                  text-white
                  font-bold
                  shadow-lg
                "
                            >
                                I Don't Know
                            </button>

                            <button
                                onClick={handleCheckAnswer}
                                className="
                  flex-1
                  bg-emerald-500
                  hover:bg-emerald-400
                  transition-all
                  duration-300
                  py-4
                  rounded-2xl
                  text-white
                  font-bold
                  shadow-lg
                "
                            >
                                Check Answer
                            </button>

                        </>

                    ) : (

                        <button
                            onClick={handleNextWord}
                            className="
                w-full
                bg-sky-500
                hover:bg-sky-400
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-white
                font-bold
                shadow-2xl
                text-lg
              "
                        >
                            Next Word →
                        </button>

                    )
                }

            </div>

            {
                feedback && (

                    <div
                        className={`
              w-full
              max-w-2xl
              rounded-2xl
              p-5
              border
              backdrop-blur-lg
              shadow-xl

              ${feedback.includes("✅")
                                ? `
                  bg-emerald-500/20
                  border-emerald-400/40
                `
                                : `
                  bg-red-500/20
                  border-red-400/40
                `
                            }
            `}
                    >

                        <div className="flex items-center gap-4">

                            <div
                                className={`
                  text-3xl

                  ${feedback.includes("✅")
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                    }
                `}
                            >
                                {
                                    feedback.includes("✅")
                                        ? "✔"
                                        : "✖"
                                }
                            </div>

                            <div>

                                <p className="text-white text-xl font-semibold">

                                    {
                                        feedback.includes("✅")
                                            ? "Correct Answer"
                                            : "Incorrect Answer"
                                    }

                                </p>

                                <p className="text-slate-300 mt-1">
                                    {feedback}
                                </p>

                            </div>

                        </div>

                    </div>

                )
            }

        </main>
    );
}

export default Quiz;