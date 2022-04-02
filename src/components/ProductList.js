import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';

import '../css/ProductList.css';

class ProductList extends Component {
  renderProducts = () => {
    const { data } = this.props;
    return data.map((product) => {
      //correct display currency
      const { selectedCurrency } = this.props;

      const productPrice = product.prices.find(
        (price) => price.currency.label === selectedCurrency.label
      );
      //

      return <Product key={product.id} info={product} price={productPrice} />;
    });
  };

  render() {
    return <div id="product_list">{this.renderProducts()}</div>;
  }
}

const mapStateToProps = ({ currency }) => {
  return {
    selectedCurrency: currency,
  };
};

export default connect(mapStateToProps)(ProductList);
