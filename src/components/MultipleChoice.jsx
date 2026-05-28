import capitalizeText from "../utils/capitalizeText";

function MultipleChoice({
    options,
    handleSelectOption,
    answerSubmitted,
    selectedOption,
    correctAnswer,
}) {

    return (

        <div
            className="
        w-full
        max-w-2xl
        grid
        grid-cols-1
        gap-4
      "
        >

            {
                options.map((option) => (

                    <button
                        key={capitalizeText(option)}
                        onClick={() =>
                            handleSelectOption(option)
                        }
                        disabled={answerSubmitted}
                        className={`
    border
    backdrop-blur-lg
    transition-all
    duration-300
    rounded-2xl
    py-4
    px-6
    font-semibold
    text-left
    shadow-lg

    ${answerSubmitted
                                ? option === correctAnswer
                                    ? `
                    bg-emerald-500/30
                    border-emerald-400
                    text-emerald-200
                  `
                                    : option === selectedOption
                                        ? `
                        bg-red-500/30
                        border-red-400
                        text-red-200
                      `
                                        : `
                        bg-white/10
                        border-white/20
                        text-slate-300
                      `
                                : `
                bg-white/10
                hover:bg-white/20
                border-white/20
                text-white
              `
                            }
`}
                    >
                        {capitalizeText(option)}
                    </button>

                ))
            }

        </div>

    );

}

export default MultipleChoice;