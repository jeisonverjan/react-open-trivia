function StartScreen({ children }) {
  return (
    <div className="start-screen-container">
      <h2>Welcome to Open Trivia interface</h2>
      <p>Filter your quiz and test your knowledge</p>
      {children}
    </div>
  );
}

export default StartScreen;
