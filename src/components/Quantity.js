import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Quantity.css';

class Quantity extends Component {
  render() {
    return (
      <div className="quantity">
        <button
          onClick={() => this.props.addItem(this.props.item)}
          className="change-quantity"
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 15V30"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 22.5H30"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p>{this.props.item.quantity}</p>
        <button
          onClick={() => this.props.reduceItem(this.props.item)}
          className="change-quantity"
        >
          <svg
            width="17"
            height="1"
            viewBox="0 0 17 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0.5H16"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cartItems: cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
    reduceItem: (payload) => dispatch({ type: 'REDUCE_ITEM', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quantity);
