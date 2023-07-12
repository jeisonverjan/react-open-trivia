function QuestionOptions({ answers, dispatch, answer, correctAnswer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options-container">
      {answers.map((answerMap, index) => (
        <button
          className={`btn btn-option ${
            answerMap === answer ? "selected" : ""
          } ${
            hasAnswered
              ? answerMap === correctAnswer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: answerMap })}
          disabled={hasAnswered}
          dangerouslySetInnerHTML={{ __html: answerMap }}
        />
      ))}
    </div>
  );
}

export default QuestionOptions;
