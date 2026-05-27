function AnswerInput({
    userAnswer,
    setUserAnswer,
    handleCheckAnswer,
    answerSubmitted,
}) {
    return (
        <div className="w-full max-w-2xl">
            <input
                disabled={answerSubmitted}
                type="text"
                placeholder="Write the meaning..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleCheckAnswer();
                    }
                }}
                className="
          w-full
          px-5
          py-4
          rounded-2xl
          bg-white/10
          border
          border-white/20
          text-white
          text-lg
          outline-none
          backdrop-blur-lg
          focus:border-sky-400
          transition-all
        "
            />
        </div>
    );
}

export default AnswerInput;