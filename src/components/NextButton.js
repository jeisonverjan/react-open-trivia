function NextButton({ answer, currentQuestion, numQuestions, dispatch }) {
  if (answer === null) return null;

  if (currentQuestion < numQuestions - 1)
    return (
      <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQuestion === numQuestions - 1)
    return (
      <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
