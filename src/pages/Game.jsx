import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from '../components/Header';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questions: [],
      count: 0,
    };

    this.onClick = this.onClick.bind(this);
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

  onClick() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { loading, questions, count } = this.state;
    if (loading) return <Loading />;
    const question = questions[count];
    return (
      <>
        <Header />
        <MultipleQuestion question={ question } onClick={ this.onClick } />
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
