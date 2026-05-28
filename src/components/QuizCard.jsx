import { motion } from "framer-motion";
import capitalizeText from "../utils/capitalizeText";

function QuizCard({ wordData, showAnswer, quizMode }) {

    const renderHighlightedExample = () => {

        let highlightedText = wordData.example;

        wordData.exampleHighlight.forEach((highlight) => {

            const regex = new RegExp(
                `(${highlight})`,
                "gi"
            );

            highlightedText =
                highlightedText.replace(
                    regex,
                    `<span class="text-sky-300 font-bold">$1</span>`
                );

        });

        return highlightedText;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="
                    backdrop-blur-lg
                    bg-white/10
                    border border-white/20
                    shadow-2xl
                    rounded-3xl
                    p-10
                    max-w-2xl
                    w-full
                "
        >
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest">
                Vocabulary Practice
            </p>

            <p
                className="
                    text-slate-400
                    uppercase
                    tracking-widest
                    text-sm
                    mb-4
                "
            >
                🏷 {wordData.category}
            </p>

            <h1 className="text-5xl font-bold text-sky-400 mb-6">{capitalizeText(wordData.word)}</h1>

            <div className="mb-8">
                <p
                    className="text-slate-300 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: renderHighlightedExample(),
                    }}
                />
            </div>

            {
                showAnswer &&
                quizMode === "write" && (
                    <div
                        className="
                        bg-slate-900/40
                        border border-slate-700
                        rounded-2xl
                        px-5
                        py-4
                    "
                    >
                        <p className="text-slate-400 text-sm mb-1">Meaning</p>

                        <p className="text-2xl font-semibold text-white">
                            {capitalizeText(wordData.displayMeaning)}
                        </p>
                    </div>
                )}
        </motion.div>
    );
}

export default QuizCard;
