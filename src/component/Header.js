import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { emailUsuario, expenses } = this.props;
    let soma = 0;
    expenses.forEach((exp) => {
      soma += Number(exp.payload.value)
      * Number(exp.exchangeRates[exp.payload.currency].ask);
    });
    return (
      <section>
        <div data-testid="email-field">{ emailUsuario }</div>
        <span data-testid="header-currency-field">BRL</span>
        <span data-testid="total-field">{ soma.toFixed(2) }</span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUsuario: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailUsuario: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
