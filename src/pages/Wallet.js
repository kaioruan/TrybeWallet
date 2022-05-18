import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin } from '../actions';
import Header from '../component/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesa: '',
      descricao: '',
      pagamento: '',
      valor: 0,
      moeda: null,
    };
  }

  componentDidMount() {
    const { coinAPI } = this.props;
    coinAPI();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.componentDidMount());
  }

  render() {
    const { coinList } = this.props;
    const { despesa, descricao, pagamento, valor, moeda } = this.state;
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
                    name="moeda"
                    value={ moeda }
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
          name="valor"
          value={ valor }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="descricao"
          value={ descricao }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          name="pagamento"
          value={ pagamento }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          name="despesa"
          value={ despesa }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho de débito</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinAPI: () => dispatch(fetchCoin()),
});

const mapStateToProps = (state) => ({
  coinList: state.wallet.currencies,
});

Wallet.propTypes = {
  coinAPI: PropTypes.func.isRequired,
  coinList: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
