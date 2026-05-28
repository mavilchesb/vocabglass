import { useState } from "react";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {

  const [screen, setScreen] = useState("home");

  const [resultsData, setResultsData] = useState(null);

  const [quizSettings, setQuizSettings] = useState({
    mode: "write",
    category: "mixed",
    difficulty: "mixed",
    wordType: "mixed",
    questionCount: 15,
  });

  return (
    <>
      {
        screen === "home" && (
          <Home
            quizSettings={quizSettings}
            setQuizSettings={setQuizSettings}
            onStart={() => setScreen("quiz")}
          />
        )
      }

      {
        screen === "quiz" && (
          <Quiz
            quizSettings={quizSettings}
            onFinish={(data) => {

              setResultsData(data);

              setScreen("results");
            }}
          />
        )
      }

      {
        screen === "results" && (
          <Results
            correctAnswers={resultsData.correctAnswers}
            wrongAnswers={resultsData.wrongAnswers}
            accuracyPercentage={resultsData.accuracyPercentage}
            finalMessage={resultsData.finalMessage}
            onRestart={() => {

              setResultsData(null);

              setScreen("home");
            }}
          />
        )
      }
    </>
  );
}

export default App;