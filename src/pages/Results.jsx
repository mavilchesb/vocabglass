function Results({
    correctAnswers,
    wrongAnswers,
    accuracyPercentage,
    finalMessage,
    bestStreak,
    onRestart,
    onHome,
}) {
    const title =
        accuracyPercentage >= 90
            ? '🏆 Vocabulary Master'
            : accuracyPercentage >= 75
              ? '🔥 Great Progress'
              : accuracyPercentage >= 50
                ? '💪 Keep Going'
                : '🚀 Nice Start';

    const performanceTier =
        accuracyPercentage >= 90
            ? 'Advanced'
            : accuracyPercentage >= 75
              ? 'Intermediate'
              : accuracyPercentage >= 50
                ? 'Developing'
                : 'Beginner';

    return (
        <main className='flex min-h-screen items-center justify-center px-6 py-10'>
            <div className='w-full max-w-4xl rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:p-12'>
                <p className='text-xs tracking-[0.35em] text-cyan-300/70 uppercase'>
                    Quiz Complete
                </p>

                <h1 className='mt-6 text-4xl font-black text-white md:text-6xl'>
                    {title}
                </h1>

                <p className='mt-6 text-7xl font-black tracking-tight text-white md:text-8xl'>
                    {accuracyPercentage}%
                </p>

                <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400'>
                    {finalMessage}
                </p>

                {/* PERFORMANCE TIER */}

                <div className='mt-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] px-6 py-6'>
                    <p className='text-xs tracking-[0.25em] text-slate-500 uppercase'>
                        Performance Tier
                    </p>

                    <h2 className='mt-3 text-3xl font-bold text-cyan-300'>
                        {performanceTier}
                    </h2>
                </div>

                {/* STATS */}

                <div className='mt-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
                    <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6'>
                        <p className='text-3xl font-bold text-white'>
                            🔥 {bestStreak}
                        </p>

                        <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                            Best Streak
                        </p>
                    </div>

                    <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6'>
                        <p className='text-3xl font-bold text-white'>
                            ✅ {correctAnswers}
                        </p>

                        <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                            Correct
                        </p>
                    </div>

                    <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6'>
                        <p className='text-3xl font-bold text-white'>
                            ❌ {wrongAnswers}
                        </p>

                        <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                            Wrong
                        </p>
                    </div>

                    <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6'>
                        <p className='text-3xl font-bold text-white'>
                            🎯 {accuracyPercentage}%
                        </p>

                        <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                            Accuracy
                        </p>
                    </div>
                </div>

                {/* ACTIONS */}

                <div className='mt-12 flex flex-col gap-4 md:flex-row md:justify-center'>
                    <button
                        onClick={onRestart}
                        className='rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-cyan-400/20'
                    >
                        Play Again →
                    </button>

                    <button
                        onClick={onHome}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-white/[0.06]'
                    >
                        Back Home
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Results;
