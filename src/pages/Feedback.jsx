import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackText = () => {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Could be better...';
    } return 'Well Done!';
  };

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackText()}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            const { history } = this.props;
            history.push('/ranking');
          } }
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.player.assertions,
    score: state.player.score,
  };
}
export default connect(mapStateToProps)(Feedback);
