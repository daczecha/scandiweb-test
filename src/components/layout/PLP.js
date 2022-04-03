import React, { Component } from 'react';
import { connect } from 'react-redux';

import client from '../../GraphQL/client';

import '../../css/PLP.css';
import { GET_PRODUCTS } from '../../GraphQL/queries';
import ProductList from '../ProductList';

class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    const { selectedCategory } = this.props;
    this.fetchProducts(selectedCategory);
  };

  componentWillReceiveProps = (nextProps) => {
    const { selectedCategory } = nextProps;
    this.fetchProducts(selectedCategory);
  };

  fetchProducts = (category) => {
    client
      .query({
        query: GET_PRODUCTS(category),
      })

      .then(({ data }) => {
        const { products } = data.category;
        this.setState({ products });
        console.log(products);
      });
  };

  render() {
    return (
      <div id="main">
        <h1 id="category_header">{this.props.selectedCategory}</h1>
        <ProductList data={this.state.products} />
      </div>
    );
  }
}

const mapStateToProps = ({ category }) => {
  return {
    selectedCategory: category,
  };
};

export default connect(mapStateToProps)(PLP);
