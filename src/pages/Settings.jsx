import { useState } from 'react';
import { clearProgress } from '../utils/progressManager';

function Settings({ onBack, appSettings, setAppSettings }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleResetProgress = () => {
        clearProgress();
        setShowConfirm(false);
        setResetSuccess(true);
        setTimeout(() => setResetSuccess(false), 3000);
    };

    const [resetSuccess, setResetSuccess] = useState(false);

    return (
        <main className='flex min-h-screen items-center justify-center px-6 py-10'>
            <div className='w-full max-w-2xl'>
                <div className='relative mb-8 flex items-center justify-center'>
                    <button
                        onClick={onBack}
                        className='absolute left-0 text-sm tracking-[0.15em] text-slate-500 uppercase transition-colors hover:text-white'
                    >
                        ← Back
                    </button>

                    <h1 className='text-4xl font-black text-white'>Settings</h1>
                </div>

                <div className='flex flex-col gap-4'>
                    {/* SPACED REPETITION */}
                    <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold text-white'>
                                    Spaced Repetition
                                </p>
                                <p className='mt-1 text-sm text-slate-500'>
                                    Difficult words appear more frequently.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setAppSettings((prev) => ({
                                        ...prev,
                                        spacedRepetition:
                                            !prev.spacedRepetition,
                                    }))
                                }
                                className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-300 ${
                                    appSettings.spacedRepetition
                                        ? 'bg-cyan-400'
                                        : 'bg-white/10'
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-white shadow transition-transform duration-300 ${
                                        appSettings.spacedRepetition
                                            ? 'translate-x-5'
                                            : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* INTERFACE LANGUAGE */}
                    <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-semibold text-white'>
                                        Interface Language
                                    </p>
                                    <span className='rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-500'>
                                        Coming soon
                                    </span>
                                </div>
                                <p className='mt-1 text-sm text-slate-500'>
                                    Switch between English and Spanish UI.
                                </p>
                            </div>

                            <button
                                disabled
                                className='relative h-7 w-12 flex-shrink-0 cursor-not-allowed rounded-full bg-white/10 opacity-40'
                            >
                                <span className='absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow' />
                            </button>
                        </div>
                    </div>

                    {/* RESET PROGRESS */}
                    <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold text-white'>
                                    Reset Progress
                                </p>
                                <p className='mt-1 text-sm text-slate-500'>
                                    Clear all your learning history.
                                </p>
                            </div>

                            {resetSuccess && (
                                <div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-6 py-4'>
                                    <p className='text-sm text-emerald-300'>
                                        ✓ Progress reset successfully.
                                    </p>
                                </div>
                            )}

                            {!showConfirm ? (
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className='rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] px-5 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-500/10'
                                >
                                    Reset
                                </button>
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <p className='text-sm text-slate-400'>
                                        Are you sure?
                                    </p>
                                    <button
                                        onClick={handleResetProgress}
                                        className='rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-400'
                                    >
                                        Yes, reset
                                    </button>
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        className='rounded-2xl border border-white/[0.08] px-4 py-2 text-sm text-slate-400 transition-colors hover:text-white'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Settings;
