import React, { Component } from 'react';
import { connect } from 'react-redux';
import client from '../../GraphQL/client';
import { GET_PRODUCT } from '../../GraphQL/queries';
import ProductGallery from '../ProductGallery';

import '../../css/PDP.css';
import ProductDetails from '../ProductDetails';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = { id: window.location.href.split('/').pop(), product: null };
  }

  componentDidMount = () => {
    const { id } = this.state;

    const { changeCategory } = this.props;
    client
      .query({
        query: GET_PRODUCT(id),
      })

      .then(({ data }) => {
        const { product } = data;
        this.setState({ product });
        changeCategory(product.category);
      });
  };

  render() {
    const { product, id } = this.state;
    return (
      <>
        {product && (
          <div className="pdp">
            <ProductGallery gallery={product.gallery} />
            <ProductDetails product={product} itemId={id} />
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (payload) => dispatch({ type: 'CHANGE_CATEGORY', payload }),
  };
};

export default connect(null, mapDispatchToProps)(PDP);
