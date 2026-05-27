function Home({ onStart }) {

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
        "
            >

                <h1
                    className="
            text-6xl
            font-bold
            text-sky-400
            mb-4
          "
                >
                    VocabGlass
                </h1>

                <p
                    className="
            text-slate-300
            text-xl
            mb-10
          "
                >
                    Learn smarter, not harder.
                </p>

                <button
                    onClick={onStart}
                    className="
            w-full
            bg-sky-500
            hover:bg-sky-400
            transition-all
            duration-300
            py-4
            rounded-2xl
            text-white
            font-bold
            shadow-xl
            text-lg
          "
                >
                    Start Quiz
                </button>

            </div>

        </main>
    );
}

export default Home;