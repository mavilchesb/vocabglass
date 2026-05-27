function ScoreBoard({ correctAnswers, wrongAnswers }) {
  const totalAnswers = correctAnswers + wrongAnswers;

  const accuracy =
    totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);

  return (
    <div
      className="
        w-full
        max-w-2xl
        backdrop-blur-lg
        bg-white/10
        border border-white/20
        rounded-3xl
        p-6
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-4
        "
      >
        <div>
          <p className="text-slate-400 text-sm">Correct</p>

          <h2 className="text-3xl font-bold text-emerald-400">
            {correctAnswers}
          </h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Wrong</p>

          <h2 className="text-3xl font-bold text-red-400">{wrongAnswers}</h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Accuracy</p>

          <h2 className="text-3xl font-bold text-sky-400">{accuracy}%</h2>
        </div>
      </div>

      <div
        className="
          w-full
          h-4
          bg-slate-800
          rounded-full
          overflow-hidden
        "
      >
        <div
          className="
            h-full
            bg-sky-400
            transition-all
            duration-500
          "
          style={{
            width: `${accuracy}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ScoreBoard;
