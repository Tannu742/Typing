const Results = ({ wpm, accuracy }) => {
  return (
    <div className="results">
      <h3>Results</h3>
      <p>Words per minute (WPM): {wpm}</p>
      <p>Accuracy: {accuracy.toFixed(2)}%</p>
    </div>
  );
};

export default Results;
