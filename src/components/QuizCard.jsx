import { motion } from 'framer-motion';
import capitalizeText from '../utils/capitalizeText';

function QuizCard({ wordData, showAnswer, quizMode }) {
    const renderHighlightedExample = () => {
        let highlightedText = wordData.example;

        wordData.exampleHighlight.forEach((highlight) => {
            const regex = new RegExp(`(${highlight})`, 'gi');

            highlightedText = highlightedText.replace(
                regex,
                `<span class="text-cyan-300 font-semibold">$1</span>`,
            );
        });

        return highlightedText;
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.45,
                ease: 'easeOut',
            }}
            className='relative w-full max-w-2xl rounded-[28px] border border-white/[0.08] bg-white/[0.03] bg-clip-padding p-12 shadow-[0_8px_32px_rgba(0,0,0,0.30)] backdrop-blur-xl'
        >
            <div className='pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/[0.04] via-transparent to-violet-400/[0.04]' />

            <p className='mb-2 text-sm tracking-[0.2em] text-slate-500 uppercase'>
                Vocabulary Practice
            </p>

            <p className='mb-5 text-sm tracking-[0.2em] text-slate-500 uppercase'>
                🏷 {wordData.category}
            </p>

            <h1 className='mb-8 text-6xl font-bold tracking-tight text-cyan-300'>
                {capitalizeText(wordData.word)}
            </h1>

            <div className='mb-10'>
                <p
                    className='text-lg leading-relaxed text-slate-400'
                    dangerouslySetInnerHTML={{
                        __html: renderHighlightedExample(),
                    }}
                />
            </div>

            {showAnswer && quizMode === 'write' && (
                <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4'>
                    <p className='mb-1 text-sm text-slate-500'>Meaning</p>

                    <p className='text-2xl font-semibold text-white'>
                        {capitalizeText(wordData.displayMeaning)}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

export default QuizCard;
