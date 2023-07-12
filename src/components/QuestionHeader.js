function QuestionHeader({ difficulty, category }) {
  return (
    <div className="question-header">
      <span>
        Difficulty: <strong>{difficulty}</strong>
      </span>
      <span>
        Category: <strong>{category}</strong>
      </span>
    </div>
  );
}

export default QuestionHeader;
