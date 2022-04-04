import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/ProductDetails.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { item: { selectedAttributes: {} } };
  }

  componentDidMount = () => {
    if (this.props.product.attributes.length) {
      let attr = { ...this.state.item.selectedAttributes };
      this.props.product.attributes.forEach((element) => {
        attr[element.name] = '';
      });
      this.setState({ item: { selectedAttributes: attr } });
    } else {
      this.setState({ item: {} });
    }
  };

  handleChooseAttribute = (field, value) => {
    let attr = { ...this.state.item.selectedAttributes };
    attr[field] = value;
    this.setState({ item: { selectedAttributes: attr } });
  };

  getPrice = () => {
    const { selectedCurrency } = this.props;

    return this.props.product.prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
  };

  renderAttributes = () =>
    this.props.product.attributes.map((a) => (
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
                }`}
                style={{ backgroundColor: i.value }}
              >
                {this.state.item.selectedAttributes[a.name] === i.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                }`}
              >
                {i.value}
              </button>
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
        <div className="attributes">{this.renderAttributes()}</div>
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
