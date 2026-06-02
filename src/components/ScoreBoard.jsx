function ScoreBoard({ currentQuestionIndex, totalQuestions }) {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;

    return (
        <div className='w-full max-w-5xl rounded-3xl border border-white/[0.08] bg-white/[0.03] px-8 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl'>
            <div className='mb-5 flex items-center justify-between gap-6'>
                <div>
                    <p className='mb-1 text-xs tracking-[0.25em] text-slate-500 uppercase'>
                        VocabGlass
                    </p>

                    <h2 className='text-2xl font-bold text-white'>
                        Vocabulary Quiz
                    </h2>
                </div>
            </div>

            <div className='mb-3'>
                <div className='mb-2 flex items-center justify-between'>
                    <p className='text-sm text-slate-400'>Progress</p>

                    <p className='text-sm text-slate-400'>
                        Question {currentQuestionIndex + 1} / {totalQuestions}
                    </p>
                </div>

                <div className='h-3 w-full overflow-hidden rounded-full bg-white/[0.04]'>
                    <div
                        className='h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-500'
                        style={{
                            width: `${progressPercentage}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;
