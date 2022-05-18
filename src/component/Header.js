import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { emailUsuario } = this.props;
    return (
      <section>
        <div data-testid="email-field">{ emailUsuario }</div>
        <span data-testid="header-currency-field">BRL</span>
        <span data-testid="total-field">0</span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUsuario: state.user.email,
});

Header.propTypes = {
  emailUsuario: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
