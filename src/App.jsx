import { useState } from 'react';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import { CATEGORIES } from './constants/quizOptions';

import DatasetAudit from './pages/DatasetAudit';

function App() {
    const [screen, setScreen] = useState('home');

    const [resultsData, setResultsData] = useState(null);

    const [quizSettings, setQuizSettings] = useState({
        mode: 'multiple',
        categories: CATEGORIES.filter((category) => category !== 'mixed'),
        difficulty: 'medium',
        questionCount: 20,
        answerLanguage: 'es',
    });

    const handleGoHome = () => {
        setResultsData(null);
        setScreen('home');
    };

    const handleRestart = () => {
        setResultsData(null);
        setScreen('quiz');
    };

    return (
        <>
            {screen === 'home' && (
                <Home
                    quizSettings={quizSettings}
                    setQuizSettings={setQuizSettings}
                    onStart={() => setScreen('quiz')}
                    onAudit={() => setScreen('audit')}
                />
            )}

            {screen === 'quiz' && (
                <Quiz
                    quizSettings={quizSettings}
                    onFinish={(data) => {
                        setResultsData(data);

                        setScreen('results');
                    }}
                    onExit={() => setScreen('home')}
                />
            )}

            {screen === 'results' && (
                <Results
                    correctAnswers={resultsData.correctAnswers}
                    wrongAnswers={resultsData.wrongAnswers}
                    accuracyPercentage={resultsData.accuracyPercentage}
                    bestStreak={resultsData.bestStreak}
                    onRestart={handleRestart}
                    onHome={handleGoHome}
                />
            )}

            {screen === 'audit' && (
                <DatasetAudit onBack={() => setScreen('home')} />
            )}
        </>
    );
}

export default App;
