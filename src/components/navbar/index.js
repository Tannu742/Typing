import React from 'react';

const Navbar = ({ 
  onPunctuationClick, 
  onQuoteClick, 
  onZenModeClick, 
  zenMode, 
  toggleTheme, 
  theme,
  onDifficultyChange,  // New prop for handling difficulty change
  difficulty           // Current difficulty state
}) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={onPunctuationClick}>Punctuation Sentences</button>
        </li>
        <li>
          <button onClick={onQuoteClick}>Quote Sentences</button>
        </li>
        <li>
          <button onClick={onZenModeClick}>
            {zenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
          </button>
        </li>
        <li>
          <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </li>
        {/* Difficulty Level Dropdown */}
        <li>
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
