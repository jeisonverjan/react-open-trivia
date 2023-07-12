import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const tick = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(tick);
    },

    [dispatch]
  );
  return (
    <div className="timer btn">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
