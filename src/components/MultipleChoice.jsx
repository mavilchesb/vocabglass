import capitalizeText from '../utils/capitalizeText';

function MultipleChoice({
    options,
    handleSelectOption,
    answerSubmitted,
    selectedOption,
    correctAnswer,
}) {
    return (
        <div className='grid w-full max-w-2xl grid-cols-2 gap-4 max-md:grid-cols-1'>
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    disabled={answerSubmitted}
                    className={`relative rounded-2xl border bg-clip-padding px-6 py-5 text-left font-medium shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-200 ${
                        answerSubmitted && option === correctAnswer
                            ? `border-cyan-300/[0.25] bg-cyan-400/[0.08] text-cyan-50`
                            : answerSubmitted &&
                                option === selectedOption &&
                                option !== correctAnswer
                              ? `border-rose-300/[0.25] bg-rose-400/[0.08] text-rose-50`
                              : `border-white/[0.08] bg-white/[0.03] hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.05]`
                    } `}
                >
                    {capitalizeText(option)}
                </button>
            ))}
        </div>
    );
}

export default MultipleChoice;
