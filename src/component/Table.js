import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../actions';

class Table extends Component {
  delete = ({ target }) => {
    const { name } = target;
    const { expenses, deletItem } = this.props;
    const newList = expenses.filter((el) => el.id !== Number(name));
    deletItem(newList);
  }

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
                <td>
                  {' '}
                  <button
                    type="button"
                    name={ exp.id }
                    data-testid="delete-btn"
                    onClick={ this.delete }
                  >
                    X
                  </button>

                </td>
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

const mapDispatchToProps = (dispatch) => ({
  deletItem: (despesas) => dispatch(deleteItem(despesas)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  deletItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
