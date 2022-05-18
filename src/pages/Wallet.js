import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin } from '../actions';
import Header from '../component/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesa: 0,
      descricao: '',
    };
  }

  componentDidMount() {
    const { coinAPI } = this.props;
    coinAPI();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { coinList } = this.props;
    const { despesa, descricao } = this.state;
    return (
      <section>
        <Header />
        <div>
          { coinList
            && (
              <div>
                {' '}
                <select>
                  {coinList.map((coin, index) => (
                    <option key={ index }>{ coin }</option>
                  ))}
                </select>

              </div>
            )}
        </div>
        <input
          type="number"
          name="despesa"
          value={ despesa }
          data-testid="value-input"
        />
        <input
          type="text"
          name="descricao"
          value={ descricao }
          data-testid="description-input"
        />
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
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
