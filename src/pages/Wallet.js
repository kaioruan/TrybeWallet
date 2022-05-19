import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpense, fetchCoin } from '../actions';
import Header from '../component/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDespesa: {},
      id: 0,
      tag: 'Alimentação',
      description: '',
      method: 'Dinheiro',
      value: 0,
      currency: 'USD',
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { coinAPI } = this.props;
    coinAPI();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {

      const { tag, description, method, value, currency, id } = this.state;
      const VALUE_MIN = 0;
      const errorCase = [
        tag.length <= VALUE_MIN,
        description.length <= VALUE_MIN,
        method.length <= VALUE_MIN,
        value <= VALUE_MIN,
        currency.length <= VALUE_MIN,
      ];
      const VerifyDisabled = errorCase.some((err) => err === true);
      this.setState({
        isDisabled: VerifyDisabled,
        listaDespesa: {
          id,
          tag,
          description,
          method,
          value,
          currency,
        },
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { listaDespesa, id } = this.state;
    const { secondFetch } = this.props;
    secondFetch(listaDespesa);
    this.setState({
      id: (id + 1),
      value: 0,
      description: '',
    });
  }

  render() {
    const { coinList } = this.props;
    const { tag, description, method, value, currency, isDisabled } = this.state;
    return (
      <section>
        <Header />
        <div>
          { coinList
            && (
              <div>
                {' '}
                <label htmlFor="Moeda">
                  Moeda
                  <select
                    onChange={ this.handleChange }
                    name="currency"
                    value={ currency }
                    id="Moeda"
                  >
                    {coinList.map((coin, index) => (
                      <option key={ index }>{ coin }</option>
                    ))}
                  </select>
                </label>

              </div>
            )}
        </div>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          name="method"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          name="tag"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho de débito</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinAPI: () => dispatch(fetchCoin()),
  secondFetch: (despesa) => dispatch(fetchExpense(despesa)),
});

const mapStateToProps = (state) => ({
  coinList: state.wallet.currencies,
});

Wallet.propTypes = {
  coinAPI: PropTypes.func.isRequired,
  secondFetch: PropTypes.func.isRequired,
  coinList: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
