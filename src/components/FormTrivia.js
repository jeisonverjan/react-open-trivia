import Option from "./Option";

function FormTrivia({
  categories,
  numQuestions,
  dispatch,
  category,
  difficulty,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "loadQuestions" });
  }

  function handleInputChange(event) {
    dispatch({
      type: "updateField",
      field: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <form className="form-trivia" onSubmit={handleSubmit}>
      <div className="form-trivia-item">
        <label htmlFor="num-questions">Number of questions:</label>
        <input
          id="num-questions"
          name="numQuestions"
          type="number"
          value={numQuestions}
          onChange={handleInputChange}
          max={50}
          min={1}
          required
        ></input>
      </div>

      <div className="form-trivia-item">
        <label htmlFor="category">Select category:</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={handleInputChange}
        >
          <Option value={""}>Any Category</Option>
          {categories.map((category) => (
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
        </select>
      </div>

      <div className="form-trivia-item">
        <label htmlFor="difficulty">Select difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={handleInputChange}
        >
          <Option value={""}>Any Category</Option>
          <Option value={"easy"}>Easy</Option>
          <Option value={"medium"}>Medium</Option>
          <Option value={"hard"}>Hard</Option>
        </select>
      </div>

      <div className="form-trivia-item btn-box">
        <button className="btn btn-form" type="submit">
          Start
        </button>
      </div>
    </form>
  );
}

export default FormTrivia;
