import React, { Component } from 'react';

import client from '../GraphQL/client';
import { GET_CURRENCIES } from '../GraphQL/queries';

import '../css/Currency.css';
import { connect } from 'react-redux';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.state = { currencies: [], isActive: false };
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    client
      .query({
        query: GET_CURRENCIES,
      })

      .then(({ data }) => {
        const { currencies } = data;
        this.setState({ currencies, selectedCurrency: currencies[0].symbol });
      });
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.isActive) this.setState({ isActive: false });
    }
  };

  renderCurrencies = () => {
    return this.state.currencies.map((c) => (
      <div
        className="option"
        key={c.label}
        onClick={() => {
          this.props.changeCurrency(c);
          this.setState({
            isActive: !this.state.isActive,
          });
        }}
      >
        {`${c.symbol} ${c.label}`}
      </div>
    ));
  };

  render() {
    const { symbol } = this.props.selectedCurrency;
    return (
      <div ref={this.wrapperRef} id="currency">
        <div
          id="selected-currency"
          onClick={() => {
            this.setState({ isActive: !this.state.isActive });
          }}
        >
          {symbol}
          <svg
            className={this.state.isActive ? 'open-arrow' : ''}
            id="arrow"
            width="10"
            height="5"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.5L4 0.5L7 3.5"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {this.state.isActive && (
          <div id="options">{this.renderCurrencies()}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ currency }) => {
  return { selectedCurrency: currency };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (payload) => dispatch({ type: 'CHANGE_CURRENCY', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
