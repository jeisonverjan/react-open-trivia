import { useMemo } from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionOptions from "./QuestionOptions";

function Question({ newQuestion, dispatch, answer }) {
  const {
    category,
    difficulty,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = newQuestion;

  const answers = useMemo(
    () => [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
    [incorrectAnswers, correctAnswer]
  );

  return (
    <div className="question-container">
      <QuestionHeader difficulty={difficulty} category={category} />

      <h4
        className="question-title"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <QuestionOptions answers={answers} dispatch={dispatch} answer={answer} correctAnswer={correctAnswer} />
    </div>
  );
}

export default Question;
