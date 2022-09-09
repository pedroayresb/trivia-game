import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/questions.css';

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

class MultipleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      category: '',
      difficulty: '',
      correctAnswer: '',
      incorrectAnswers: [],
      questionText: '',
      suffledAnswers: [],
      time: 30,
    };
    this.toggleClicked = this.toggleClicked.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    const { category,
      difficulty } = question;
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const questionText = question.question;
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const suffledAnswers = shuffle(allAnswers);
    this.setState({
      category,
      difficulty,
      correctAnswer,
      incorrectAnswers,
      questionText,
      suffledAnswers,
    });
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { time } = this.state;
      this.setState({ time: time - 1 });
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { time, correctAnswer } = this.state;
    const { onAnswer } = this.props;
    const { intervalId } = this;
    if (time === 0) {
      onAnswer();
      this.setState({
        isClicked: true,
        time: `Correct Answer: ${correctAnswer}` }, () => {
        clearInterval(intervalId);
      });
    }
  }

  toggleClicked = () => {
    const { onAnswer } = this.props;
    console.log(onAnswer);
    onAnswer();
    this.setState({
      isClicked: true,
    });
  };

  render() {
    const { category,
      difficulty,
      questionText,
      suffledAnswers,
      correctAnswer,
      incorrectAnswers,
      isClicked,
      time } = this.state;
    const style = {
      borderStyle: 'solid',
    };
    return (
      <div>
        <h1>{time}</h1>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{questionText}</h2>
        <h3 data-testid="question-difficulty">{difficulty}</h3>
        <div data-testid="answer-options">
          {suffledAnswers.map((answer, index) => {
            if (answer === correctAnswer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  className="correct-answer"
                  key={ index }
                  style={ isClicked ? style : null }
                  onClick={ this.toggleClicked }
                  disabled={ isClicked }
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
                className="wrong-answer"
                key={ index }
                style={ isClicked ? style : null }
                onClick={ this.toggleClicked }
                disabled={ isClicked }
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

MultipleQuestion.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default MultipleQuestion;
