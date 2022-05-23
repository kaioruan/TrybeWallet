import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
        <tbody>
          {expenses.map((exp) => {
            const currenciesSearch = Object.entries(exp.exchangeRates)
              .find((currency) => currency[0] === exp.currency);
            console.log(currenciesSearch);
            const nameCurrencie = currenciesSearch[1].name.split('/');
            const currencieValue = currenciesSearch[1].ask;
            const total = exp.value * currencieValue;
            return (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>{nameCurrencie[0]}</td>
                <td>{Number(currencieValue).toFixed(2)}</td>
                <td>{total.toFixed(2)}</td>
                <td>Real</td>
              </tr>);
          })}
        </tbody>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Table);
