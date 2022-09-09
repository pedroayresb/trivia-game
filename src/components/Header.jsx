import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;

    // console.log(name);

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
          Seu placar: 0
          {/* {score} */}
        </p>

      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // score: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
