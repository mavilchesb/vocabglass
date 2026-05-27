import { motion } from "framer-motion";

function HomeCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
        backdrop-blur-lg
        bg-white/10
        border border-white/20
        shadow-2xl
        rounded-3xl
        p-10
        max-w-xl
        w-full
      "
        >
            <h1 className="text-5xl font-bold mb-4 text-sky-400">
                VocabGlass
            </h1>

            <p className="text-slate-300 text-lg mb-8">
                Learn smarter, not harder.
            </p>

            <button
                className="
          bg-sky-500
          hover:bg-sky-400
          transition-all
          duration-300
          px-6
          py-3
          rounded-2xl
          text-white
          font-semibold
          shadow-lg
        "
            >
                Start Practice
            </button>
        </motion.div>
    );
}

export default HomeCard;