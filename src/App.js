import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import PDP from './components/layout/PDP';
import PLP from './components/layout/PLP';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<PLP />} />
          <Route path="/product/:id" element={<PDP />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
