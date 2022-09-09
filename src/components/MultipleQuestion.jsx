import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions';
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
    if (difficulty === 'hard') {
      this.setState({ multiple: 3 });
    } else if (difficulty === 'medium') {
      this.setState({ multiple: 2 });
    } else {
      this.setState({ multiple: 1 });
    }
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

  toggleClicked = (event) => {
    const { onAnswer, dispatch } = this.props;
    const { correctAnswer } = this.state;
    onAnswer();
    this.setState({
      isClicked: true }, () => {
      clearInterval(this.intervalId);
      const { className } = event.target;
      if (className === 'correct-answer') {
        const { time, multiple } = this.state;
        const { gravatarEmail, name, assertions, score } = this.props;
        const MULTIPLIER = 10;
        const newScore = Number(score)
        + Number(MULTIPLIER)
        + Number(Number(time) * Number(multiple));
        const dispatchObj = {
          gravatarEmail,
          name,
          score: newScore,
          assertions: assertions + 1,
        };
        dispatch(addScore(dispatchObj));
        this.setState({ status: 'Correct!', time: `Correct Answer: ${correctAnswer}` });
      } else {
        this.setState({ status: 'Wrong!' });
      }
    });
  };

  render() {
    const { category,
      difficulty,
      questionText,
      suffledAnswers,
      correctAnswer,
      status,
      incorrectAnswers,
      isClicked,
      time } = this.state;
    const style = {
      borderStyle: 'solid',
    };
    return (
      <div>
        <h1>{time}</h1>
        <p>{ status }</p>
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
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  name: state.user.name,
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps, null)(MultipleQuestion);
