import { AnimatePresence, motion } from 'framer-motion';
import capitalizeText from '../utils/capitalizeText';
import { useMemo } from 'react';
import { getWordProgress, isDifficult } from '../utils/progressManager';

function QuizCard({ wordData, showAnswer, quizMode, answerLanguage }) {
    const highlightedExample = useMemo(() => {
        if (answerLanguage === 'en') return wordData.example;

        let highlightedText = wordData.example;

        wordData.exampleHighlight.forEach((highlight) => {
            const escapedHighlight = highlight.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&',
            );
            const regex = new RegExp(escapedHighlight, 'gi');
            highlightedText = highlightedText.replace(
                regex,
                (match) =>
                    `<span class="text-cyan-300 font-semibold">${match}</span>`,
            );
        });

        return highlightedText;
    }, [wordData.example, wordData.exampleHighlight, answerLanguage]);

    const wordProgress = getWordProgress(wordData.id);
    const isWordDifficult = isDifficult(wordProgress);

    return (
        <motion.div
            key={wordData.id}
            initial={{
                opacity: 0,
                y: 15,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.3,
            }}
            className='relative w-full rounded-[28px] border border-white/[0.08] bg-white/[0.03] bg-clip-padding p-12 shadow-[0_8px_32px_rgba(0,0,0,0.30)] backdrop-blur-xl'
        >
            <div className='pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/[0.04] via-transparent to-violet-400/[0.04]' />

            <p className='mb-5 text-center text-sm tracking-[0.2em] text-slate-500 uppercase'>
                {wordData.category}
            </p>

            {isWordDifficult && (
                <div className='mb-4 flex justify-center'>
                    <span className='rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs tracking-[0.15em] text-yellow-300 uppercase'>
                        🔁 Reviewing
                    </span>
                </div>
            )}

            <h1 className='mb-8 text-center text-5xl font-bold tracking-tight text-cyan-300'>
                {answerLanguage === 'en'
                    ? capitalizeText(wordData.displayMeaning)
                    : capitalizeText(wordData.word)}
            </h1>

            <div className='mb-10 text-center'>
                {answerLanguage === 'en' ? (
                    <p className='text-lg text-slate-600 italic'>
                        No example available in this mode yet.
                    </p>
                ) : (
                    <p
                        className='text-lg leading-relaxed text-slate-400'
                        dangerouslySetInnerHTML={{ __html: highlightedExample }}
                    />
                )}
            </div>

            <AnimatePresence>
                {showAnswer && quizMode === 'write' && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center'
                    >
                        <p className='mb-1 text-sm text-slate-500'>
                            {answerLanguage === 'en' ? 'Word' : 'Meaning'}
                        </p>

                        <p className='text-2xl font-semibold text-white'>
                            {answerLanguage === 'en'
                                ? capitalizeText(wordData.word)
                                : capitalizeText(wordData.displayMeaning)}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default QuizCard;
