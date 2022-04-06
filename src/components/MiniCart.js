import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/MiniCart.css';
import Quantity from './Quantity';

class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.state = {
      cartItemsCount: this.props.cartItems.length,
      isActive: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { cartItems } = nextProps;
    this.setState({ cartItemsCount: cartItems.length });
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.isActive) this.setState({ isActive: false });
    }
  };

  getPrice = (product) => {
    const { selectedCurrency } = this.props;

    return product.prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
  };

  calculatePrice = () => {
    const { cartItems } = this.props;

    let allPrices = [];
    let symbol = '';

    cartItems.forEach((i) => {
      const { amount, currency } = this.getPrice(i);

      allPrices.push(Number(amount));
      symbol = currency.symbol;
    });

    return `${allPrices
      .reduce(function (a, b) {
        return a + b;
      }, 0)
      .toFixed(2)} ${symbol}`;
  };

  renderSelectedAttributes = (item) => {
    let attributeArray = [];

    for (const attributeName in item.selectedAttributes) {
      attributeArray.push(
        <div
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
      );
    }
    return attributeArray;
  };

  renderCartItems = () => {
    const { cartItems } = this.props;

    return cartItems.map((i) => {
      const { amount, currency } = this.getPrice(i);
      return (
        <div key={i.id + Math.random()} className="minicart-item">
          <div className="minicart-item-details">
            <p id="minicart-item-brand">{i.brand}</p>
            <p id="minicart-item-name">{i.name}</p>
            <p id="minicart-item-price">
              <p id="minicart-item-amount">
                {currency.symbol}
                {amount}
              </p>
            </p>
            <div className="minicart-item-attributes">
              {this.renderSelectedAttributes(i)}
            </div>
          </div>

          <div className="right">
            <Quantity item={i}></Quantity>
            <img className="minicart-img" alt="ss" src={i.gallery[0]}></img>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        ref={this.wrapperRef}
        onClick={() => this.setState({ isActive: true })}
        id="minicart-button"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.4736 4.8484C23.0186 4.29247 22.3109 3.95457 21.5785 3.95457H6.19066L5.71097 2.16691C5.43262 1.12772 4.47323 0.402832 3.36082 0.402832H0.783719C0.354361 0.402832 0 0.740725 0 1.15227C0 1.56284 0.353351 1.9017 0.783719 1.9017H3.36082C3.73985 1.9017 4.06854 2.14333 4.1692 2.50577L7.25167 14.2494C7.53003 15.2886 8.48941 16.0135 9.60182 16.0135H19.6833C20.7947 16.0135 21.7808 15.2886 22.0335 14.2494L23.9286 6.80699C24.1053 6.1293 23.9543 5.40442 23.4736 4.84848L23.4736 4.8484ZM22.3879 6.46712L20.4928 13.9095C20.3921 14.272 20.0634 14.5136 19.6844 14.5136H9.60185C9.22282 14.5136 8.89413 14.272 8.79347 13.9095L6.59533 5.47717H21.5796C21.8323 5.47717 22.085 5.59798 22.237 5.79148C22.388 5.98403 22.463 6.22566 22.388 6.46729L22.3879 6.46712Z"
            fill="#43464E"
          />
          <path
            d="M10.1332 16.9778C8.69316 16.9778 7.50586 18.1132 7.50586 19.4902C7.50586 20.8672 8.69326 22.0027 10.1332 22.0027C11.5733 22.0036 12.7606 20.8682 12.7606 19.491C12.7606 18.1137 11.5732 16.9775 10.1332 16.9775V16.9778ZM10.1332 20.4814C9.55188 20.4814 9.09685 20.0463 9.09685 19.4903C9.09685 18.9344 9.55188 18.4993 10.1332 18.4993C10.7146 18.4993 11.1696 18.9344 11.1696 19.4903C11.1687 20.0227 10.689 20.4814 10.1332 20.4814Z"
            fill="#43464E"
          />
          <path
            d="M18.8251 16.978C17.3851 16.978 16.1978 18.1135 16.1978 19.4905C16.1978 20.8675 17.3852 22.0029 18.8251 22.0029C20.2651 22.0029 21.4525 20.8675 21.4525 19.4905C21.4279 18.1143 20.2651 16.978 18.8251 16.978ZM18.8251 20.4816C18.2438 20.4816 17.7887 20.0465 17.7887 19.4906C17.7887 18.9346 18.2438 18.4995 18.8251 18.4995C19.4065 18.4995 19.8615 18.9346 19.8615 19.4906C19.8615 20.0229 19.3809 20.4816 18.8251 20.4816Z"
            fill="#43464E"
          />
        </svg>
        <div id="item-count">{this.state.cartItemsCount}</div>
        {this.state.isActive && (
          <div id="minicart-content">
            <p className="minicart-title">
              My Bag, <span>{this.state.cartItemsCount} items</span>
            </p>
            {this.renderCartItems()}
            <div id="footer">
              <Link style={{ flex: 1 }} to="/cart">
                <button id="view-bag" style={{ width: '100%' }}>
                  View Bag
                </button>
              </Link>
              <button id="checkout">Checkout</button>
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
