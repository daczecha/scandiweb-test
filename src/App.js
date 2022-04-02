import React, { Component } from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
