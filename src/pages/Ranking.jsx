import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../services/localstorage';

class Ranking extends Component {
  render() {
    const num1 = -1;
    const ranking = getRanking().sort((a, b) => {
      if (a.score > b.score) {
        return num1;
      }
      return true;
    });
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="submit"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Home
        </button>
        <ol>
          { ranking.map((elemento, index) => (
            <li key={ index }>
              <img
                src={ elemento.picture }
                alt="avatar"
              />
              <p
                data-testid={ `player-name-${index}` }
                name="name"
                value="name"
              >
                { elemento.name }
              </p>
              <p
                name="currency"
                value="score"
                data-testid={ `player-score-${index}` }
              >
                { elemento.score }
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
