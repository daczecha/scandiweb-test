import React, { Component } from 'react';

import '../css/ProductGallery.css';

export default class ProductGallery extends Component {
  constructor(props) {
    super(props);
    const { gallery } = this.props;
    this.state = { selectedImg: gallery[0] };
  }

  renderGallery = () =>
    this.props.gallery.map((img, i) => {
      return (
        <div
          onClick={() => this.setState({ selectedImg: img })}
          className="img-container"
          key={img}
        >
          <img src={img} alt={`img-${i}`}></img>
        </div>
      );
    });

  render() {
    return (
      <div className="product-gallery">
        <div className="mini-gallery">{this.renderGallery()}</div>
        <div className="selected-img">
          <img src={this.state.selectedImg} alt="selectedImg"></img>
        </div>
      </div>
    );
  }
}
