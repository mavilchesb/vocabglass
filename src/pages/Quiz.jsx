import { useEffect, useMemo, useState } from "react";

import QuizCard from "../components/QuizCard";
import AnswerInput from "../components/AnswerInput";
import ScoreBoard from "../components/ScoreBoard";

import vocabularyData from "../data/vocabulary.json";

import normalizeText from "../utils/normalizeText";

import filterWords from "../utils/filterWords";
import shuffleArray from "../utils/shuffleArray";

import MultipleChoice from "../components/MultipleChoice";
import getRandomOptions from "../utils/getRandomOptions";

function Quiz({
    quizSettings,
    onFinish,
}) {

    const vocabulary = vocabularyData.vocabulary;

    const quizWords = useMemo(() => {

        const filteredWords = filterWords(
            vocabulary,
            quizSettings,
        );

        return shuffleArray(
            filteredWords,
        ).slice(
            0,
            quizSettings.questionCount,
        );

    }, [vocabulary, quizSettings]);

    const QUIZ_SIZE = quizWords.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentWord =
        quizWords[currentQuestionIndex] ||
        quizWords[QUIZ_SIZE - 1];

    const multipleChoiceOptions = useMemo(() => {

        return getRandomOptions(
            currentWord,
            vocabulary,
        );

    }, [currentWord, vocabulary]);

    const [userAnswer, setUserAnswer] = useState("");

    const [feedback, setFeedback] = useState("");

    const [showAnswer, setShowAnswer] = useState(false);

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [wrongAnswers, setWrongAnswers] = useState(0);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleNextWord = () => {

        setSelectedOption(null);

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

        const validAnswers = currentWord.acceptedAnswers
            .map(answer => normalizeText(answer));

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
                `❌ Correct answer: ${currentWord.displayMeaning}`
            );

            setWrongAnswers(
                prev => prev + 1
            );
        }

        setShowAnswer(true);

        setAnswerSubmitted(true);
    };

    const handleSelectOption = (selectedOption) => {

        if (answerSubmitted) {
            return;
        }

        setSelectedOption(selectedOption);

        if (
            selectedOption === currentWord.displayMeaning
        ) {

            setFeedback("✅ Correct!");

            setCorrectAnswers(
                prev => prev + 1
            );

        } else {

            setFeedback(
                `❌ Correct answer: ${currentWord.displayMeaning}`
            );

            setWrongAnswers(
                prev => prev + 1
            );

        }

        setShowAnswer(true);

        setAnswerSubmitted(true);

    };

    useEffect(() => {

        if (currentQuestionIndex < QUIZ_SIZE) {
            return;
        }

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

    }, [
        currentQuestionIndex,
        QUIZ_SIZE,
        correctAnswers,
        wrongAnswers,
        onFinish,
    ]);

    if (QUIZ_SIZE === 0) {

        return (

            <main
                className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
            >

                <div
                    className="
          max-w-xl
          w-full
          backdrop-blur-lg
          bg-white/10
          border
          border-white/20
          rounded-3xl
          p-10
          text-center
          shadow-2xl
        "
                >

                    <h1
                        className="
            text-4xl
            font-bold
            text-red-400
            mb-4
          "
                    >
                        No Words Found 😢
                    </h1>

                    <p className="text-slate-300 mb-8">
                        Try changing the category,
                        difficulty, or word type.
                    </p>

                </div>

            </main>

        );

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
                quizMode={quizSettings.mode}
            />

            {
                quizSettings.mode === "write" ? (
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
                )
            }

            <div className="w-full max-w-2xl flex gap-4">

                {
                    !answerSubmitted ? (
                        <>

                            <button
                                onClick={() => {

                                    setFeedback(
                                        `❌ Correct answer: ${currentWord.displayMeaning}`
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

                            {
                                quizSettings.mode === "write" && (

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

                                )
                            }

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
                feedback &&
                quizSettings.mode === "write" && (

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