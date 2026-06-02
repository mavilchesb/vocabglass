function AnswerInput({
    userAnswer,
    setUserAnswer,
    handleCheckAnswer,
    answerSubmitted,
    feedback,
}) {
    return (
        <div className='w-full max-w-2xl'>
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
        </div>
    );
}

export default AnswerInput;
