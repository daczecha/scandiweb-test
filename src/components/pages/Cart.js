import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../css/Cart.css';
import Carousel from '../Carousel';
import Quantity from '../Quantity';

class Cart extends Component {
  componentDidMount = () => {
    this.props.changeCategory('');
  };

  renderCartItems = () => {
    const { cartItems } = this.props;

    return cartItems.map((i) => {
      const { amount, currency } = this.getPrice(i);
      return (
        <div key={i.id + Math.random()} className="cart-item">
          <div className="item-details">
            <p id="brand">{i.brand}</p>
            <p id="name">{i.name}</p>
            <div id="price">
              <p id="amount">
                {currency.symbol}
                {amount}
              </p>
            </div>
            <div className="cart-item-attributes">
              {this.renderSelectedAttributes(i)}
            </div>
          </div>

          <div className="right">
            <Quantity item={i}></Quantity>
            <Carousel gallery={i.gallery}></Carousel>
            <div onClick={() => this.props.removeItem(i)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    });
  };

  renderSelectedAttributes = (item) => {
    let attributeArray = [];

    for (const attributeName in item.selectedAttributes) {
      attributeArray.push(
        <div className="attr-page">
          <p>{attributeName}:</p>
          <div
            key={attributeName + item.selectedAttributes[attributeName]}
            style={
              attributeName === 'Color'
                ? { backgroundColor: item.selectedAttributes[attributeName] }
                : {}
            }
            className={`attribute-cart selected ${
              attributeName === 'Color' ? 'color' : ''
            }`}
          >
            {attributeName !== 'Color' ? (
              item.selectedAttributes[attributeName]
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
      );
    }
    return attributeArray;
  };

  getPrice = (product) => {
    const { selectedCurrency } = this.props;

    return product.prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
  };

  calculateTotalPrice = () => {
    const { cartItems } = this.props;

    let allPrices = [];
    let symbol = '';

    cartItems.forEach((i) => {
      const { amount, currency } = this.getPrice(i);

      allPrices.push(Number(amount * i.quantity));
      symbol = currency.symbol;
    });

    return `${allPrices
      .reduce(function (a, b) {
        return a + b;
      }, 0)
      .toFixed(2)} ${symbol}`;
  };

  render() {
    return (
      <div>
        <div id="cart_header">
          <h1 id="cart_title">Cart</h1>
          <div>
            <h1 id="total">{'Total ' + this.calculateTotalPrice()}</h1>
            <button className="cart-button checkout">checkout</button>
            <button
              onClick={() => {
                this.props.clearCart();
              }}
              className="cart-button clear"
            >
              clear
            </button>
          </div>
        </div>
        {this.renderCartItems()}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, currency }) => {
  return {
    cartItems: cart,
    selectedCurrency: currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (payload) => dispatch({ type: 'CHANGE_CATEGORY', payload }),
    removeItem: (payload) => dispatch({ type: 'REMOVE_ITEM', payload }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
