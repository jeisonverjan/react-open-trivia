import { useEffect, useReducer } from "react";
import Header from "./Header";
import StartScreen from "./StartScreen";
import FormTrivia from "./FormTrivia";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //// 'preset, 'loading', 'error', 'ready', 'active', 'finished'
  status: "preset",
  categories: [],
  numQuestions: 10,
  category: "",
  difficulty: "",
  currentQuestion: 0,
  answer: null,
  score: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "receivedCategories":
      return { ...state, categories: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "updateField":
      return { ...state, [action.field]: action.value };

    case "loadQuestions":
      return { ...state, status: "loading" };

    case "receivedQuestions":
      return {
        ...state,
        questions: action.payload,
        status: "active",
        secondsRemaining: Number(state.numQuestions) * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.currentQuestion);
      const points =
        question.difficulty === "easy"
          ? 10
          : question.difficulty === "medium"
          ? 20
          : 30;
      return {
        ...state,
        answer: action.payload,
        score:
          question.correct_answer === action.payload
            ? state.score + points
            : state.score,
      };

    case "nextQuestion":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };

    case "finish":
      return { ...state, status: "finished" };

    case "reset":
      return { ...initialState };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    {
      questions,
      status,
      categories,
      numQuestions,
      category,
      difficulty,
      currentQuestion,
      answer,
      score,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, cur) =>
      prev +
      (cur.difficulty === "easy" ? 10 : cur.difficulty === "medium" ? 20 : 30),
    0
  );

  useEffect(
    function () {
      if (status === "preset") {
        fetch(`https://opentdb.com/api_category.php`)
          .then((resCategory) => resCategory.json())
          .then((dataCategory) =>
            dispatch({
              type: "receivedCategories",
              payload: dataCategory.trivia_categories,
            })
          )
          .catch(() => dispatch({ type: "dataFailed" }));
      }
    },
    [status]
  );

  useEffect(
    function () {
      if (status === "loading") {
        fetch(
          `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
          .then((resQuestions) => resQuestions.json())
          .then((dataQuestions) =>
            dispatch({
              type: "receivedQuestions",
              payload: dataQuestions.results,
            })
          )
          .catch((err) => dispatch({ type: "dataFiled" }));
      }
    },
    [numQuestions, category, difficulty, status]
  );

  return (
    <div className="main-container">
      <Header />
      {status === "preset" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen>
          <FormTrivia
            categories={categories}
            numQuestions={numQuestions}
            category={category}
            difficulty={difficulty}
            dispatch={dispatch}
          />
        </StartScreen>
      )}
      {status === "loading" && <Loader />}
      {status === "active" && (
        <>
          <Progress
            numQuestions={numQuestions}
            currentQuestion={currentQuestion}
            answer={answer}
            score={score}
            maxPossiblePoints={maxPossiblePoints}
          />
          <Question
            newQuestion={questions.at(currentQuestion)}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            <NextButton
              answer={answer}
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
              dispatch={dispatch}
            />
          </Footer>
        </>
      )}
      {status === "finished" && (
        <FinishScreen
          score={score}
          dispatch={dispatch}
          maxPossiblePoints={maxPossiblePoints}
        />
      )}
    </div>
  );
}

export default App;
