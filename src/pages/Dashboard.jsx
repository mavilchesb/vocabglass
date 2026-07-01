import { useMemo } from 'react';
import vocabularyData from '../data/vocabulary.json';
import {
    getAllProgress,
    isDifficult,
    isMastered,
} from '../utils/progressManager';

function Dashboard({ onBack }) {
    const vocabulary = vocabularyData.vocabulary;

    const { mastered, difficult, stats } = useMemo(() => {
        const progress = getAllProgress();

        const mastered = [];
        const difficult = [];

        let totalCorrect = 0;
        let totalWrong = 0;

        vocabulary.forEach((word) => {
            const p = progress[word.id];
            if (!p) return;

            totalCorrect += p.correct;
            totalWrong += p.wrong;

            if (isMastered(p)) mastered.push({ word, progress: p });
            else if (isDifficult(p)) difficult.push({ word, progress: p });
        });

        const totalAnswered = totalCorrect + totalWrong;
        const accuracy =
            totalAnswered > 0
                ? Math.round((totalCorrect / totalAnswered) * 100)
                : 0;

        return {
            mastered: mastered.sort(
                (a, b) => b.progress.correct - a.progress.correct,
            ),
            difficult: difficult.sort(
                (a, b) => a.progress.score - b.progress.score,
            ),
            stats: { totalCorrect, totalWrong, totalAnswered, accuracy },
        };
    }, [vocabulary]);

    return (
        <main className='flex min-h-screen items-center justify-center px-6 py-10'>
            <div className='w-full max-w-6xl'>
                <div className='relative mb-8 flex items-center justify-center'>
                    <button
                        onClick={onBack}
                        className='absolute left-0 text-sm tracking-[0.15em] text-slate-500 uppercase transition-colors hover:text-white'
                    >
                        ← Back
                    </button>

                    <h1 className='text-4xl font-black text-white'>
                        My Progress
                    </h1>
                </div>

                {/* STATS */}
                <div className='mb-8 grid gap-4 md:grid-cols-4'>
                    {[
                        {
                            label: 'Answered',
                            value: stats.totalAnswered,
                            color: 'text-white',
                        },
                        {
                            label: 'Correct',
                            value: stats.totalCorrect,
                            color: 'text-emerald-300',
                        },
                        {
                            label: 'Wrong',
                            value: stats.totalWrong,
                            color: 'text-rose-300',
                        },
                        {
                            label: 'Accuracy',
                            value: `${stats.accuracy}%`,
                            color: 'text-cyan-300',
                        },
                    ].map(({ label, value, color }) => (
                        <div
                            key={label}
                            className='flex flex-col items-center rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 text-center backdrop-blur-xl'
                        >
                            <p className='text-xs tracking-[0.2em] text-slate-500 uppercase'>
                                {label}
                            </p>
                            <p className={`mt-3 text-4xl font-black ${color}`}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='grid gap-8 lg:grid-cols-2'>
                    {/* DIFFICULT WORDS */}
                    <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                        <h2 className='mb-6 text-xl font-bold text-rose-300'>
                            💪 Needs Practice ({difficult.length})
                        </h2>

                        {difficult.length === 0 ? (
                            <p className='text-slate-500'>
                                No difficult words yet. Keep practicing!
                            </p>
                        ) : (
                            <div className='space-y-3'>
                                {difficult.map(({ word, progress }) => (
                                    <div
                                        key={word.id}
                                        className='flex items-center justify-between rounded-2xl border border-rose-400/10 bg-rose-500/[0.04] px-5 py-4'
                                    >
                                        <div>
                                            <p className='font-semibold text-white capitalize'>
                                                {word.word}
                                            </p>
                                            <p className='text-sm text-slate-500'>
                                                {word.displayMeaning}
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-sm text-rose-300'>
                                                ✕ {progress.wrong} wrong
                                            </p>
                                            <p className='text-xs text-slate-600'>
                                                ✓ {progress.correct} correct
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MASTERED WORDS */}
                    <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                        <h2 className='mb-6 text-xl font-bold text-emerald-300'>
                            🏆 Mastered ({mastered.length})
                        </h2>

                        {mastered.length === 0 ? (
                            <p className='text-slate-500'>
                                No mastered words yet. Keep going!
                            </p>
                        ) : (
                            <div className='space-y-3'>
                                {mastered.map(({ word, progress }) => (
                                    <div
                                        key={word.id}
                                        className='flex items-center justify-between rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.04] px-5 py-4'
                                    >
                                        <div>
                                            <p className='font-semibold text-white capitalize'>
                                                {word.word}
                                            </p>
                                            <p className='text-sm text-slate-500'>
                                                {word.displayMeaning}
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-sm text-emerald-300'>
                                                ✓ {progress.correct} correct
                                            </p>
                                            <p className='text-xs text-slate-600'>
                                                Score: {progress.score}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
