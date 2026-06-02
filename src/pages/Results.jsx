function Results({
    correctAnswers,
    wrongAnswers,
    accuracyPercentage,
    finalMessage,
    bestStreak,
    onRestart,
}) {
    return (
        <main className='flex min-h-screen items-center justify-center px-6'>
            <div className='w-full max-w-4xl rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.30)] backdrop-blur-2xl'>
                <p className='text-xs tracking-[0.35em] text-cyan-300/70 uppercase'>
                    Quiz Complete
                </p>

                <h1 className='mt-6 text-8xl font-black tracking-tight text-white'>
                    {accuracyPercentage}%
                </h1>

                <h2 className='mt-6 text-3xl font-bold text-white'>
                    {accuracyPercentage >= 90
                        ? 'Outstanding 🔥'
                        : accuracyPercentage >= 75
                          ? 'Great Job 👏'
                          : accuracyPercentage >= 50
                            ? 'Nice Work 💪'
                            : 'Keep Practicing 🚀'}
                </h2>

                <p className='mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400'>
                    {finalMessage}
                </p>

                <div className='mt-12 rounded-3xl px-10 py-8'>
                    <div className='grid grid-cols-3 gap-8'>
                        <div>
                            <p className='text-4xl font-bold text-white'>
                                🔥 {bestStreak}
                            </p>

                            <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                                Best Streak
                            </p>
                        </div>

                        <div>
                            <p className='text-4xl font-bold text-white'>
                                ✅ {correctAnswers}
                            </p>

                            <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                                Correct
                            </p>
                        </div>

                        <div>
                            <p className='text-4xl font-bold text-white'>
                                ❌ {wrongAnswers}
                            </p>

                            <p className='mt-2 text-xs tracking-[0.2em] text-slate-500 uppercase'>
                                Wrong
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className='mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-cyan-400/20'
                >
                    Play Again →
                </button>
            </div>
        </main>
    );
}

export default Results;
