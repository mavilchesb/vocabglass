import QuizSettings from '../components/QuizSettings';
import { motion } from 'framer-motion';

function Home({
    quizSettings,
    setQuizSettings,
    onStart,
    onAudit,
    onDashboard,
    onSettings,
}) {
    return (
        <main className='flex min-h-screen items-center justify-center px-6 py-10'>
            <div className='grid w-full max-w-7xl gap-12 lg:grid-cols-2'>
                {/* LEFT SIDE */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -40,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className='relative flex flex-col justify-center'
                >
                    <div className='pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]' />
                    <div className='pointer-events-none absolute top-40 left-32 h-[260px] w-[260px] rounded-full bg-violet-500/15 blur-[120px]' />
                    <p className='mb-4 text-xs tracking-[0.35em] text-cyan-300/70 uppercase'>
                        AI Powered Vocabulary Trainer
                    </p>

                    <h1 className='text-7xl font-black tracking-[-0.04em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] md:text-8xl'>
                        Vocab
                        <span className='bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]'>
                            Glass
                        </span>
                    </h1>

                    <div className='mt-8 h-px w-40 bg-gradient-to-r from-cyan-400/50 to-transparent' />

                    <p className='mt-8 max-w-lg text-xl leading-relaxed text-slate-300'>
                        Learn English vocabulary through contextual practice,
                        intelligent quizzes and immersive learning experiences.
                    </p>

                    <div className='mt-12 flex max-w-xl gap-4'>
                        <div className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl'>
                            <p className='text-3xl font-bold text-white'>
                                1000+
                            </p>

                            <p className='mt-2 text-xs tracking-[0.15em] text-slate-500 uppercase'>
                                Words
                            </p>
                        </div>

                        <div className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl'>
                            <p className='text-3xl font-bold text-white'>AI</p>

                            <p className='mt-2 text-xs tracking-[0.15em] text-slate-500 uppercase'>
                                Quizzes
                            </p>
                        </div>

                        <div className='flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl'>
                            <p className='text-3xl font-bold text-white'>
                                Context
                            </p>

                            <p className='mt-2 text-xs tracking-[0.15em] text-slate-500 uppercase'>
                                Learning
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT SIDE */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 40,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                    }}
                    className='flex flex-col gap-6'
                >
                    <QuizSettings
                        quizSettings={quizSettings}
                        setQuizSettings={setQuizSettings}
                    />

                    <motion.button
                        onClick={onStart}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.05] px-10 py-4 font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                    >
                        Start Quiz →
                    </motion.button>

                    <button
                        onClick={onAudit}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white'
                    >
                        Dataset Audit
                    </button>

                    <button
                        onClick={onDashboard}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white'
                    >
                        My Progress
                    </button>

                    <button
                        onClick={onSettings}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white'
                    >
                        Settings
                    </button>
                </motion.div>
            </div>
        </main>
    );
}

export default Home;
