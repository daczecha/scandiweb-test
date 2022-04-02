import React, { Component } from 'react';

import Category from './Category';

import client from '../GraphQL/client';
import { GET_CATEGORIES } from '../GraphQL/queries';

import { connect } from 'react-redux';

import '../css/Categories.css';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount = () => {
    client
      .query({
        query: GET_CATEGORIES,
      })

      .then(({ data }) => {
        const { categories } = data;
        this.setState({ categories });
      });
  };

  renderCategories() {
    return this.state.categories.map((c) => {
      const { selectedCategory } = this.props;
      return (
        <Category
          selected={c.name === selectedCategory}
          name={c.name}
          key={c.name}
        />
      );
    });
  }

  render() {
    return <div id="categories">{this.renderCategories()}</div>;
  }
}

const mapStateToProps = ({ category }) => {
  return {
    selectedCategory: category,
  };
};

export default connect(mapStateToProps)(Categories);
