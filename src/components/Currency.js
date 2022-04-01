import React, { Component } from 'react';

import client from '../GraphQL/client';
import { GET_CURRENCIES } from '../GraphQL/queries';

import '../css/Currency.css';

export default class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = { currencies: [], selectedCurrency: '', isActive: false };
  }

  componentDidMount = () => {
    client
      .query({
        query: GET_CURRENCIES,
      })

      .then(({ data }) => {
        const { currencies } = data;
        this.setState({ currencies, selectedCurrency: currencies[0].symbol });
      });
  };

  renderCurrencies = () => {
    return this.state.currencies.map((c) => (
      <div
        className="option"
        key={c.label}
        onClick={() => {
          this.setState({
            isActive: !this.state.isActive,
            selectedCurrency: c.symbol,
          });
        }}
      >
        {`${c.symbol} ${c.label}`}
      </div>
    ));
  };

  render() {
    return (
      <div id="currency">
        <div
          id="selected-currency"
          onClick={() => {
            this.setState({ isActive: !this.state.isActive });
          }}
        >
          {this.state.selectedCurrency}
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
