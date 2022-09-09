import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Loading from '../components/Loading';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from '../components/Header';
import { saveRanking } from '../services/localstorage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questions: [],
      count: 0,
      display: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await questions.json();
    if (questionsJson.response_code === 0) {
      this.setState({
        questions: questionsJson.results,
        loading: false,
      });
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  onAnswer() {
    this.setState({ display: 'inline' });
  }

  onClick() {
    const { count } = this.state;
    this.setState({
      loading: true,
    }, () => {
      const MAX_QUESTIONS = 4;
      if (count === MAX_QUESTIONS) {
        const { gravatarEmail, name, score, assertions } = this.props;
        console.log(gravatarEmail, name, score, assertions);
        const ranking = {
          name,
          score,
          picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
          assertions,
        };
        saveRanking(ranking);
        const { history } = this.props;
        history.push('/feedback');
      }
      this.setState({
        count: count + 1,
        loading: false,
        display: false,
      });
    });
  }

  render() {
    const { loading, questions, count, display } = this.state;
    if (loading) return <Loading />;
    const question = questions[count];
    return (
      <div>
        <Header />
        <MultipleQuestion question={ question } onAnswer={ this.onAnswer } />
        {display ? (
          <button
            type="button"
            onClick={ this.onClick }
            data-testid="btn-next"
            display={ display }
          >
            Next
          </button>)
          : null}
      </div>

    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Game);
