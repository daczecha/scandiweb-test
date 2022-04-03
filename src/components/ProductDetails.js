import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/ProductDetails.css';

class ProductDetails extends Component {
  getPrice = () => {
    const { selectedCurrency } = this.props;

    return this.props.product.prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
  };

  renderAttributes = this.props.product.attributes.map((a) => (
    <div className="attribute">
      <p>{a.name}</p>
      <div className={`${a.type}`}>
        {a.items.map((i) => {
          return a.type === 'swatch' ? (
            <button className="item" style={{ backgroundColor: i.value }}>
              {' '}
            </button>
          ) : (
            <button className="item">{i.value}</button>
          );
        })}
      </div>
    </div>
  ));
  render() {
    const { brand, name, description } = this.props.product;
    const { amount, currency } = this.getPrice();

    return (
      <div className="product-details">
        <div className="info">
          <p id="brand">{brand}</p>
          <p id="name">{name}</p>
        </div>
        <div className="attributes">{this.renderAttributes}</div>
        <div className="price">
          <p>price:</p>
          <p id="amount">
            {currency.symbol} {amount}
          </p>
        </div>
        <button id="add-to-cart">Add To Cart</button>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    );
  }
}

const mapStateToProps = ({ currency }) => {
  return {
    selectedCurrency: currency,
  };
};

export default connect(mapStateToProps)(ProductDetails);
