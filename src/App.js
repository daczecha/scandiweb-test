import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';

import PDP from './components/pages/PDP';
import PLP from './components/pages/PLP';
import Cart from './components/pages/Cart';
import Footer from './components/layout/Footer';

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
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<PDP />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}
