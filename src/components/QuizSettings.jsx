import { CATEGORIES, DIFFICULTIES, QUIZ_MODES } from '../constants/quizOptions';

import capitalizeText from '../utils/capitalizeText';

function QuizSettings({ quizSettings, setQuizSettings }) {
    const updateSetting = (key, value) => {
        setQuizSettings({
            ...quizSettings,
            [key]: value,
        });
    };

    const labelStyle = 'text-xs uppercase tracking-[0.18em] text-cyan-300/70';

    const sortedCategories = CATEGORIES.filter(
        (category) => category !== 'mixed',
    ).sort();

    return (
        <div className='w-full max-w-5xl rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl'>
            <div className='grid gap-6 md:grid-cols-2'>
                <div>
                    <label className={labelStyle}>Quiz Mode</label>

                    <div className='mt-2 flex rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl'>
                        {QUIZ_MODES.map((mode) => (
                            <button
                                key={mode.value}
                                type='button'
                                onClick={() =>
                                    updateSetting('mode', mode.value)
                                }
                                className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors duration-200 ${
                                    quizSettings.mode === mode.value
                                        ? 'bg-white/[0.08] text-white'
                                        : 'text-slate-400 hover:text-white'
                                } `}
                            >
                                {mode.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className={labelStyle}>Difficulty</label>

                    <div className='mt-2 flex rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl'>
                        {DIFFICULTIES.map((difficulty) => (
                            <button
                                key={difficulty}
                                type='button'
                                onClick={() =>
                                    updateSetting('difficulty', difficulty)
                                }
                                className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors duration-200 ${
                                    quizSettings.difficulty === difficulty
                                        ? 'bg-white/[0.08] text-white'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {capitalizeText(difficulty)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='mt-6 grid gap-8 md:grid-cols-[1fr_1fr]'>
                {/* CATEGORIES */}

                <div>
                    <label className={labelStyle}>Categories</label>

                    <div className='mt-3 flex flex-wrap gap-3'>
                        {sortedCategories.map((category) => {
                            const selected =
                                quizSettings.categories.includes(category);

                            return (
                                <button
                                    type='button'
                                    key={category}
                                    onClick={() => {
                                        if (selected) {
                                            updateSetting(
                                                'categories',
                                                quizSettings.categories.filter(
                                                    (c) => c !== category,
                                                ),
                                            );
                                        } else {
                                            updateSetting('categories', [
                                                ...quizSettings.categories,
                                                category,
                                            ]);
                                        }
                                    }}
                                    className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
                                        selected
                                            ? 'border-white/[0.12] bg-white/[0.08] text-white'
                                            : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                                    }`}
                                >
                                    {capitalizeText(category)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* QUESTION COUNT */}

                <div>
                    <div className='mb-3 flex items-center justify-between'>
                        <label className={labelStyle}>Question Count</label>

                        <span className='text-sm font-semibold text-white'>
                            {quizSettings.questionCount}
                        </span>
                    </div>

                    <input
                        type='range'
                        min='10'
                        max='30'
                        step='5'
                        value={quizSettings.questionCount}
                        onChange={(e) =>
                            updateSetting(
                                'questionCount',
                                Number(e.target.value),
                            )
                        }
                        className='mt-8 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08]'
                    />
                </div>
            </div>
        </div>
    );
}

export default QuizSettings;
