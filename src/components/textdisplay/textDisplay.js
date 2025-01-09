const TextDisplay = ({ text, typedText }) => {
  return (
    <div className="text-display">
      <p>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={typedText[index] === char ? 'correct' : (typedText[index] ? 'incorrect' : '')}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TextDisplay;
