import { useEffect, useState } from 'react';
import TextDisplay from './components/textdisplay/textDisplay';
import TypingArea from './components/TypingArea/TypingArea';
import Results from './components/result/results';
import Timer from './components/timer/timer';
import { sentences } from './constants/data';
import "./App.css"
const App = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sentenceFinished, setSentenceFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState('light');

  const currentSentence = sentences[currentSentenceIndex]; 

  useEffect(() => {
    // Save the selected theme in localStorage so it persists between sessions
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load the theme from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleTypedText = (value) => {
    setTypedText(value);
  };

  const handleStartTyping = () => {
    setStartTyping(true);
    setSentenceFinished(false);
  };

  const handleStopTyping = () => {
    setStartTyping(false);
    const calculatedWpm = Math.floor((typedText.length / 5) * 60);
    setWpm(calculatedWpm);
    setAccuracy((typedText.length / currentSentence.length) * 100);

    if (calculatedWpm >= 150 && accuracy >= 100) {
      setShowPopup(true);
    }
  };

  const handleCompleteTyping = () => {
    handleStopTyping(); 
    setIsCompleted(true);
    setSentenceFinished(true);
  };

  const handleNextSentence = () => {
    setIsCompleted(false);
    setTypedText("");
    setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    setSentenceFinished(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Typing Master</h1>

      <TextDisplay text={currentSentence} typedText={typedText} />

      {!startTyping && !sentenceFinished && (
        <button className="start-typing-btn" onClick={handleStartTyping}>Start Typing</button>
      )}

      {startTyping && (
        <TypingArea text={currentSentence} onTyped={handleTypedText} onComplete={handleCompleteTyping} />
      )}

      {startTyping && <Timer start={startTyping} />}

      {isCompleted && (
        <div>
          <Results wpm={wpm} accuracy={accuracy} />
          <button onClick={handleNextSentence}>Next Sentence</button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You achieved 150 WPM with 100% accuracy!</p>
            <p>You're a typing master! Keep going!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
};

export default App;
