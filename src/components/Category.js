import React, { Component } from 'react';

import { connect } from 'react-redux';

import '../css/Category.css';

class Category extends Component {
  render() {
    const { changeCategory, name } = this.props;
    return (
      <div
        onClick={() => changeCategory(name)}
        className={`category ${this.props.selected && 'selected-category'}`}
      >
        {name}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (payload) => dispatch({ type: 'CHANGE_CATEGORY', payload }),
  };
};

export default connect(null, mapDispatchToProps)(Category);
