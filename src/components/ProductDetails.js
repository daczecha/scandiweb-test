import React, { Component } from 'react';
import { connect } from 'react-redux';

import DOMPurify from 'dompurify';

import '../css/ProductDetails.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    const { product, itemId } = this.props;

    this.state = {
      item: {
        selectedAttributes: {},
        gallery: product.gallery,
        prices: product.prices,
        name: product.name,
        brand: product.brand,
        inStock: product.inStock,
        id: itemId,
      },
    };
  }

  componentDidMount = () => {
    const { item } = this.state;
    const { product } = this.props;

    let attr = { ...item.selectedAttributes };

    product.attributes.forEach((element) => {
      attr[element.name] = element.items[0].value; //set first value as default
    });

    this.setState({
      item: {
        ...item,
        selectedAttributes: attr,
      },
    });
  };

  handleChooseAttribute = (field, value) => {
    const { item } = this.state;

    let attr = { ...item.selectedAttributes };
    attr[field] = value;

    this.setState({
      item: {
        ...item,
        selectedAttributes: attr,
      },
    });
  };

  getPrice = () => {
    const { selectedCurrency, product } = this.props;

    return product.prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
  };

  renderAttributes = () => {
    const { product } = this.props;

    var props = {};

    if (!product.inStock) {
      props.disabled = true;
    }

    return product.attributes.map((a) => (
      <div key={a.name} className="attribute">
        <p>{a.name}</p>
        <div className={`${a.type}`}>
          {a.items.map((i) => {
            return a.type === 'swatch' ? (
              <button
                onClick={() => this.handleChooseAttribute(a.name, i.value)}
                key={i.value}
                className={`item color ${
                  this.state.item.selectedAttributes[a.name] === i.value
                    ? 'selected'
                    : ''
                }  ${!product.inStock && 'disabled'}`}
                style={{ backgroundColor: i.value }}
                {...props}
              >
                {this.state.item.selectedAttributes[a.name] === i.value &&
                  product.inStock && (
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
              </button>
            ) : (
              <button
                onClick={() => this.handleChooseAttribute(a.name, i.value)}
                key={i.value}
                className={`item ${
                  this.state.item.selectedAttributes[a.name] === i.value
                    ? 'selected'
                    : ''
                } ${!product.inStock && 'disabled'}`}
                {...props}
              >
                {i.value}
              </button>
            );
          })}
        </div>
      </div>
    ));
  };

  render() {
    const { brand, name, description, attributes, inStock } =
      this.props.product;
    const { amount, currency } = this.getPrice();

    return (
      <div className="product-details">
        <div className="info">
          <p id="brand">{brand}</p>
          <p id="name">{name}</p>
        </div>
        {attributes.length ? (
          <div className="attributes">{this.renderAttributes()}</div>
        ) : null}
        <div className="price">
          <p>price:</p>
          <p id="amount">
            {currency.symbol} {amount}
          </p>
        </div>
        {inStock ? (
          <button
            onClick={() => this.props.addItem(this.state.item)}
            id="add-to-cart"
          >
            Add To Cart
          </button>
        ) : (
          <button disabled id="add-to-cart" className="disabled-button">
            OUT OF STOCK
          </button>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ currency, cart }) => {
  return {
    selectedCurrency: currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
