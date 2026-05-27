function Results({
    correctAnswers,
    wrongAnswers,
    accuracyPercentage,
    finalMessage,
    onRestart,
}) {

    return (

        <main
            className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
        >

            <div
                className="
          w-full
          max-w-2xl
          backdrop-blur-lg
          bg-white/10
          border border-white/20
          rounded-3xl
          p-10
          shadow-2xl
          text-center
        "
            >

                <h1 className="text-5xl font-bold text-sky-400 mb-6">
                    Quiz Finished 🎉
                </h1>

                <p className="text-slate-300 text-xl mb-10">
                    {finalMessage}
                </p>

                <div className="grid grid-cols-3 gap-6 mb-10">

                    <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6">

                        <p className="text-slate-300 mb-2">
                            Correct
                        </p>

                        <h2 className="text-4xl font-bold text-emerald-400">
                            {correctAnswers}
                        </h2>

                    </div>

                    <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-6">

                        <p className="text-slate-300 mb-2">
                            Wrong
                        </p>

                        <h2 className="text-4xl font-bold text-red-400">
                            {wrongAnswers}
                        </h2>

                    </div>

                    <div className="bg-sky-500/20 border border-sky-400/30 rounded-2xl p-6">

                        <p className="text-slate-300 mb-2">
                            Accuracy
                        </p>

                        <h2 className="text-4xl font-bold text-sky-400">
                            {accuracyPercentage}%
                        </h2>

                    </div>

                </div>

                <button
                    onClick={onRestart}
                    className="
            bg-sky-500
            hover:bg-sky-400
            transition-all
            duration-300
            px-8
            py-4
            rounded-2xl
            text-white
            font-bold
            shadow-xl
            text-lg
          "
                >
                    Restart Quiz
                </button>

            </div>

        </main>
    );
}

export default Results;