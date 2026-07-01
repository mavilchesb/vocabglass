function buildHint(meaning) {
    return meaning
        .split(' ')
        .map((word) => word[0] + '_'.repeat(word.length - 1))
        .join(' ');
}

function AnswerInput({
    userAnswer,
    setUserAnswer,
    handleCheckAnswer,
    answerSubmitted,
    feedback,
    hintUsed,
    showHint,
    onHint,
    displayMeaning,
}) {
    return (
        <div className='w-full max-w-2xl space-y-3'>
            <input
                disabled={answerSubmitted}
                type='text'
                placeholder='Write the meaning...'
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleCheckAnswer();
                    }
                }}
                className={`w-full rounded-2xl px-6 py-5 text-center text-lg text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 outline-none placeholder:text-slate-500 ${
                    answerSubmitted
                        ? feedback.includes('✅')
                            ? 'border border-cyan-300/[0.25] bg-cyan-400/[0.08] text-cyan-50'
                            : 'border border-rose-300/[0.25] bg-rose-400/[0.08] text-rose-50'
                        : 'border border-white/[0.08] bg-white/[0.03] focus:border-cyan-400/20 focus:bg-white/[0.05]'
                }`}
            />

            {!answerSubmitted && !hintUsed && (
                <button
                    onClick={onHint}
                    className='w-full rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.04] py-3 text-sm text-yellow-300 transition-colors hover:bg-yellow-400/[0.08]'
                >
                    💡 Hint
                </button>
            )}

            {showHint && (
                <div className='rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.04] px-5 py-3 text-center'>
                    <p className='font-mono text-lg tracking-widest text-yellow-300'>
                        {buildHint(displayMeaning)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default AnswerInput;
