import { useState } from 'react';

const TypingArea = ({ text, onTyped, onComplete }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    onTyped(value);

    // Check if the user has completed the typing
    if (value === text) {
      onComplete();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default TypingArea;
