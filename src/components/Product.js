import React, { Component } from 'react';

import '../css/Product.css';

export default class Product extends Component {
  render() {
    const { id, name, gallery } = this.props.info;
    const { amount, currency } = this.props.price;

    return (
      <div className="product">
        <div className="product-img">
          <img src={gallery[0]} alt={id}></img>
        </div>
        <div className="product-name">{name}</div>
        <div className="product-price">
          {currency.symbol}
          {amount}
        </div>
      </div>
    );
  }
}
