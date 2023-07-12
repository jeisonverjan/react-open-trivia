function Progress({
  numQuestions,
  currentQuestion,
  answer,
  score,
  maxPossiblePoints,
}) {
  return (
    <header className="progress-container">
      <progress
        max={numQuestions}
        value={currentQuestion + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        Score: <strong>{score}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
