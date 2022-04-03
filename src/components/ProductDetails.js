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

  render() {
    const { brand, name, description } = this.props.product;
    const { amount, currency } = this.getPrice();

    console.log(description);
    return (
      <div className="product-details">
        <div className="info">
          <p>{brand}</p>
          <p>{name}</p>
        </div>
        <div className="price">
          <p>price:</p>
          <p>
            {currency.symbol} {amount}
          </p>
        </div>
        <button className="add-to-cart">Add To Cart</button>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
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
