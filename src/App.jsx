import { useEffect, useState } from 'react';
import TextDisplay from './components/textdisplay/textDisplay';
import TypingArea from './components/TypingArea/TypingArea';
import Results from './components/result/results';
import Timer from './components/timer/timer';
import { punctuationSentences, quoteSentences, easySentences, mediumSentences, hardSentences } from './constants/data';
import './App.css';
import Navbar from './components/navbar';

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
  const [zenMode, setZenMode] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentSentenceArray, setCurrentSentenceArray] = useState(easySentences);
  const [fontStyle, setFontStyle] = useState('Arial');
  const currentSentence = currentSentenceArray[currentSentenceIndex];

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

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
    setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % currentSentenceArray.length);
    setSentenceFinished(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    if (level === 'easy') {
      setCurrentSentenceArray(easySentences);
    } else if (level === 'medium') {
      setCurrentSentenceArray(mediumSentences);
    } else if (level === 'hard') {
      setCurrentSentenceArray(hardSentences);
    }
  };

  const handlePunctuationClick = () => {
    setCurrentSentenceArray(punctuationSentences);
    setCurrentSentenceIndex(0);
  };

  const handleQuoteClick = () => {
    setCurrentSentenceArray(quoteSentences); 
    setCurrentSentenceIndex(0); 
  };

  const toggleZenMode = () => {
    setZenMode((prev) => !prev);
    setTypedText("");
    setSentenceFinished(false);
  };

  const handleFontChange = (event) => {
    setFontStyle(event.target.value);
  };

  return (
    <div className={`App ${theme} ${zenMode ? 'zen-mode' : ''}`}>
      <header className="header">
        <h1>Typing Master</h1>
        <Navbar 
          onPunctuationClick={handlePunctuationClick} 
          onQuoteClick={handleQuoteClick} 
          onZenModeClick={toggleZenMode} 
          zenMode={zenMode} 
          toggleTheme={toggleTheme} 
          theme={theme}
          onDifficultyChange={handleDifficultyChange} // Pass the handler here
          difficulty={difficulty} // Pass the current difficulty
          onFontChange={handleFontChange}
        />
      </header>

      {zenMode ? (
        <div>
          <TypingArea
            text={typedText}
            onTyped={handleTypedText}
            onComplete={handleCompleteTyping}
            fontStyle={fontStyle}
          />
        </div>
      ) : (
        <>
          <TextDisplay
            text={currentSentence}
            typedText={typedText}
            fontStyle={fontStyle}
          />

          {!startTyping && !sentenceFinished && (
            <button className="start-typing-btn" onClick={handleStartTyping}>Start Typing</button>
          )}

          {startTyping && (
            <TypingArea
              text={currentSentence}
              onTyped={handleTypedText}
              onComplete={handleCompleteTyping}
              fontStyle={fontStyle}
            />
          )}

          {startTyping && <Timer start={startTyping} />}

          {isCompleted && (
            <div>
              <Results wpm={wpm} accuracy={accuracy} />
              <button onClick={handleNextSentence}>Next Sentence</button>
            </div>
          )}
        </>
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
    </div>
  );
};

export default App;
