import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email, score, assertions } = this.props;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p
          name="name"
          value="name"
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          name="currency"
          value="score"
          data-testid="header-score"
        >
          Score:
          {score}
        </p>
        <p>
          Assertions:
          {assertions}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Header);
