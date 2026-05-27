import { useState } from "react";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {

  const [screen, setScreen] = useState("home");

  const [resultsData, setResultsData] = useState(null);

  return (

    <>
      {
        screen === "home" && (

          <Home
            onStart={() => setScreen("quiz")}
          />

        )
      }

      {
        screen === "quiz" && (

          <Quiz
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