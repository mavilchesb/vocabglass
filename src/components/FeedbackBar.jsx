import { motion } from 'framer-motion';
import capitalizeText from '../utils/capitalizeText';

function FeedbackBar({
    isCorrect,
    wordData,
    answerLanguage,
    highlightedExample,
    highlightedExampleEs,
    onContinue,
}) {
    const meaningLabel = answerLanguage === 'en' ? 'Word' : 'Meaning';
    const meaningValue =
        answerLanguage === 'en'
            ? capitalizeText(wordData.word)
            : capitalizeText(wordData.displayMeaning);

    const exampleHtml =
        answerLanguage === 'en' ? highlightedExample : highlightedExampleEs;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur-2xl ${
                isCorrect
                    ? 'border-emerald-400/20 bg-emerald-950/90'
                    : 'border-rose-400/20 bg-rose-950/90'
            }`}
        >
            <div className='mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-start gap-4'>
                    <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl ${
                            isCorrect
                                ? 'bg-emerald-400/15 text-emerald-300'
                                : 'bg-rose-400/15 text-rose-300'
                        }`}
                    >
                        {isCorrect ? '✓' : '✕'}
                    </div>

                    <div>
                        <p
                            className={`text-lg font-bold ${
                                isCorrect ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                        >
                            {isCorrect ? '¡Bien hecho!' : 'Incorrecto'}
                        </p>

                        <p className='mt-1 text-sm text-slate-300'>
                            {meaningLabel}: {meaningValue}
                        </p>

                        {exampleHtml && (
                            <p
                                className='mt-1 text-sm text-slate-400'
                                dangerouslySetInnerHTML={{
                                    __html: exampleHtml,
                                }}
                            />
                        )}
                    </div>
                </div>

                <button
                    onClick={onContinue}
                    className={`flex-shrink-0 rounded-2xl px-8 py-3 font-bold transition-colors duration-200 ${
                        isCorrect
                            ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300'
                            : 'bg-rose-400 text-rose-950 hover:bg-rose-300'
                    }`}
                >
                    Continuar →
                </button>
            </div>
        </motion.div>
    );
}

export default FeedbackBar;
