import React from 'react';
import PropTypes from 'prop-types';

function shuffle(array) {
  let currentIndex = array.length; let
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function multipleQuestion(props) {
  const { question,
    category,
    difficulty } = props.question;
  const correctAnswer = props.question.correct_answer;
  const incorrectAnswers = props.question.incorrect_answers;
  const allAnswers = [...incorrectAnswers, correctAnswer];
  const suffledAnswers = shuffle(allAnswers);
  console.log(suffledAnswers);
  return (
    <div>
      <h1 data-testid="question-category">{category}</h1>
      <h2 data-testid="question-text">{question}</h2>
      <h3 data-testid="question-difficulty">{difficulty}</h3>
      <div data-testid="answer-options">
        {suffledAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                key={ index }
              >
                {answer}
              </button>
            );
          }
          const i = incorrectAnswers.indexOf(answer);
          return (
            <button
              type="button"
              data-testid={ `wrong-answer-${i}` }
              key={ index }
            >
              {answer}
            </button>
          );
        })}
      </div>

    </div>
  );
}

multipleQuestion.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default multipleQuestion;
