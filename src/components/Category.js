import React, { Component } from 'react';

import '../css/Category.css';

export default class Category extends Component {
  render() {
    return (
      <div className={`category ${this.props.selected && 'selected-category'}`}>
        {this.props.name}
      </div>
    );
  }
}
