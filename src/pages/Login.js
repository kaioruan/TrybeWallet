import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveUserEmail from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = this.state;
    this.setState({
      [name]: value,
    });
    const PASSWORD = 5;
    const EMAIL_VALUE = 14;
    const errorCase = [
      password.length < PASSWORD,
      email.length < EMAIL_VALUE,
    ];
    const isDisabledTest = errorCase.some((err) => err === true);
    this.setState({ isDisabled: isDisabledTest });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, enviarEmail } = this.props;
    const { email } = this.state;
    enviarEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChangeCapture={ this.handleChange }
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChangeCapture={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviarEmail: (email) => dispatch(saveUserEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  enviarEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
