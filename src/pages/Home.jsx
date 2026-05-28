import QuizSettings from "../components/QuizSettings";

function Home({
    quizSettings,
    setQuizSettings,
    onStart,
}) {

    return (

        <main
            className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-6
        gap-8
      "
        >

            <div className="text-center">

                <h1
                    className="
            text-6xl
            font-black
            text-white
            mb-4
          "
                >
                    VocabGlass
                </h1>

                <p
                    className="
            text-slate-300
            text-xl
            max-w-xl
          "
                >
                    Learn vocabulary through immersive
                    contextual quizzes.
                </p>

            </div>

            <QuizSettings
                quizSettings={quizSettings}
                setQuizSettings={setQuizSettings}
            />

            <button
                onClick={onStart}
                className="
          bg-sky-500
          hover:bg-sky-400
          transition-all
          duration-300
          px-10
          py-4
          rounded-2xl
          text-white
          font-bold
          shadow-2xl
          text-xl
        "
            >
                Start Quiz 🚀
            </button>

        </main>

    );
}

export default Home;