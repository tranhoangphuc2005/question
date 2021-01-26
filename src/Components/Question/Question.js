import React from "react";
import { Checkbox, Form, Button } from "semantic-ui-react";

const Question = ({
  questions,
  setQuestions,
  score,
  setScore,
  setShowScore,
}) => {
  return (
    <>
      {questions.map((q, i) => (
        <Form>
          <Form.Field>{q.question}</Form.Field>
          {q.answer.map((v) => (
            <Form.Field>
              <Checkbox
                onChange={(_, { value }) => {
                  setQuestions((prev) => {
                    prev[i].selectedAnswer = value;
                    return [...prev];
                  });
                }}
                radio
                label={v}
                value={v}
                name="checkboxRadioGroup"
                checked={v === q.selectedAnswer}
              />
            </Form.Field>
          ))}
        </Form>
      ))}
      <button
        class="ui button"
        onClick={() => {
          let newScore = score;
          questions.forEach((q) => {
            if (q.selectedAnswer === q.correct_answer) {
              newScore++;
            }
          });
          setScore(newScore);
          setShowScore(true);
        }}
      >
        submit
      </button>
    </>
  );
};

export default Question;
