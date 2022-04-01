import React, { Component } from 'react';

import Category from './Category';

import client from '../GraphQL/client';
import { GET_CATEGORIES } from '../GraphQL/queries';

import '../css/Categories.css';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], selectedCategory: '' };
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
      return <Category selected={false} name={c.name} key={c.name} />;
    });
  }

  render() {
    return <div id="categories">{this.renderCategories()}</div>;
  }
}
