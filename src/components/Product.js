import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/Product.css';

class Product extends Component {
  constructor(props) {
    super(props);

    const { info } = this.props;

    this.state = {
      item: {
        selectedAttributes: {},
        gallery: info.gallery,
        prices: info.prices,
        name: info.name,
        brand: info.brand,
        inStock: info.inStock,
        id: info.id,
      },
    };
  }

  componentDidMount = () => {
    const { item } = this.state;
    const { info } = this.props;

    let attr = { ...item.selectedAttributes };

    info.attributes.forEach((element) => {
      attr[element.name] = element.items[0].value; //set first value as default
    });

    this.setState({
      item: {
        ...item,
        selectedAttributes: attr,
      },
    });
  };

  render() {
    const { id, name, brand, gallery, inStock } = this.state.item;
    const { amount, currency } = this.props.price;

    return (
      <div className={`product ${inStock ? '' : 'out-of-stock'}`}>
        <Link to={`/product/${id}`} className="card">
          <div className="product-img">
            <img src={gallery[0]} alt={id}></img>
            {inStock ? null : (
              <h1 className="out-of-stock-text">OUT OF STOCK</h1>
            )}
          </div>

          <div className="product-name">
            {brand} {name}
          </div>
          <div className="product-price">
            {currency.symbol}
            {amount}
          </div>
        </Link>
        {inStock && (
          <div
            className="add-to-cart"
            onClick={() => this.props.addItem(this.state.item)}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.4736 4.8484C23.0186 4.29247 22.3109 3.95457 21.5785 3.95457H6.19066L5.71097 2.16691C5.43262 1.12772 4.47323 0.402832 3.36082 0.402832H0.783719C0.354361 0.402832 0 0.740725 0 1.15227C0 1.56284 0.353351 1.9017 0.783719 1.9017H3.36082C3.73985 1.9017 4.06854 2.14333 4.1692 2.50577L7.25167 14.2494C7.53003 15.2886 8.48941 16.0135 9.60182 16.0135H19.6833C20.7947 16.0135 21.7808 15.2886 22.0335 14.2494L23.9286 6.80699C24.1053 6.1293 23.9543 5.40442 23.4736 4.84848L23.4736 4.8484ZM22.3879 6.46712L20.4928 13.9095C20.3921 14.272 20.0634 14.5136 19.6844 14.5136H9.60185C9.22282 14.5136 8.89413 14.272 8.79347 13.9095L6.59533 5.47717H21.5796C21.8323 5.47717 22.085 5.59798 22.237 5.79148C22.388 5.98403 22.463 6.22566 22.388 6.46729L22.3879 6.46712Z"
                fill="white"
              />
              <path
                d="M10.1332 16.9778C8.69316 16.9778 7.50586 18.1132 7.50586 19.4902C7.50586 20.8672 8.69326 22.0027 10.1332 22.0027C11.5733 22.0036 12.7606 20.8682 12.7606 19.491C12.7606 18.1137 11.5732 16.9775 10.1332 16.9775V16.9778ZM10.1332 20.4814C9.55188 20.4814 9.09685 20.0463 9.09685 19.4903C9.09685 18.9344 9.55188 18.4993 10.1332 18.4993C10.7146 18.4993 11.1696 18.9344 11.1696 19.4903C11.1687 20.0227 10.689 20.4814 10.1332 20.4814Z"
                fill="white"
              />
              <path
                d="M18.8251 16.978C17.3851 16.978 16.1978 18.1135 16.1978 19.4905C16.1978 20.8675 17.3852 22.0029 18.8251 22.0029C20.2651 22.0029 21.4525 20.8675 21.4525 19.4905C21.4279 18.1143 20.2651 16.978 18.8251 16.978ZM18.8251 20.4816C18.2438 20.4816 17.7887 20.0465 17.7887 19.4906C17.7887 18.9346 18.2438 18.4995 18.8251 18.4995C19.4065 18.4995 19.8615 18.9346 19.8615 19.4906C19.8615 20.0229 19.3809 20.4816 18.8251 20.4816Z"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
  };
};

export default connect(null, mapDispatchToProps)(Product);
