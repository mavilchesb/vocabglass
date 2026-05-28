import {
    CATEGORIES,
    DIFFICULTIES,
    QUESTION_COUNTS,
    QUIZ_MODES,
    WORD_TYPES,
} from "../constants/quizOptions";

function QuizSettings({
    quizSettings,
    setQuizSettings,
}) {

    return (

        <div
            className="
        w-full
        max-w-2xl
        backdrop-blur-lg
        bg-white/10
        border
        border-white/20
        rounded-3xl
        p-8
        shadow-2xl
        flex
        flex-col
        gap-6
      "
        >

            <div>

                <label className="text-white font-semibold">
                    Quiz Mode
                </label>

                <select
                    value={quizSettings.mode}
                    onChange={(e) =>
                        setQuizSettings({
                            ...quizSettings,
                            mode: e.target.value,
                        })
                    }
                    className="
            w-full
            mt-2
            bg-slate-900/70
            text-white
            rounded-xl
            p-3
          "
                >

                    {
                        QUIZ_MODES.map((mode) => (

                            <option
                                key={mode.value}
                                value={mode.value}
                            >
                                {mode.label}
                            </option>

                        ))
                    }

                </select>

            </div>

            <div>

                <label className="text-white font-semibold">
                    Question Count
                </label>

                <select
                    value={quizSettings.questionCount}
                    onChange={(e) =>
                        setQuizSettings({
                            ...quizSettings,
                            questionCount: Number(e.target.value),
                        })
                    }
                    className="
            w-full
            mt-2
            bg-slate-900/70
            text-white
            rounded-xl
            p-3
          "
                >

                    {
                        QUESTION_COUNTS.map((count) => (

                            <option
                                key={count}
                                value={count}
                            >
                                {count}
                            </option>

                        ))
                    }

                </select>

            </div>

        </div>

    );
}

export default QuizSettings;