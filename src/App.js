import Question from "./Components/Question/Question";
import { useState, useEffect } from "react";
import axios from "axios";

const api = `https://opentdb.com/api.php?amount=10&category=14&difficulty=medium`;

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  function randomArr(a, b) {
    return [...a, b].sort();
  }

  const callApi = async () => {
    let res = await axios.get(api);
    // const newData =
    //   res.data.results.question.correct_answer.concat.incorrect_answers;

    // newData.forEach((v) => {
    //   v.answers = randomArr(v.incorrect_answers, v.correct_answer);
    // });

    const newData = res.data.results.map((v) => ({
      ...v,
      answer: randomArr(v.incorrect_answers, v.correct_answer),
      selectedAnswer: "",
    }));

    setQuestions(newData);
  };

  return (
    <>
      {showScore ? (
        <div>
          <span>Score : {score}</span>
          <button
            onClick={() => {
              setScore(0);
              setShowScore(false);
              setQuestions((prev) =>
                prev.map((v) => ({
                  ...v,
                  selectedAnswer: "",
                }))
              );
            }}
          >
            back
          </button>
        </div>
      ) : (
        <Question
          score={score}
          setScore={setScore}
          questions={questions}
          setQuestions={setQuestions}
          showScore={showScore}
          setShowScore={setShowScore}
        />
      )}
    </>
  );
}

export default App;
