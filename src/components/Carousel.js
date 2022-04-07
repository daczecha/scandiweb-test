import React, { Component } from 'react';

import '../css/Carousel.css';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  showNextImg = () => {
    const { gallery } = this.props;
    const { index } = this.state;

    if (index >= gallery.length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: index + 1 });
    }
  };

  showPrevImg = () => {
    const { gallery } = this.props;
    const { index } = this.state;

    if (index <= 0) {
      this.setState({ index: gallery.length - 1 });
    } else {
      this.setState({ index: index - 1 });
    }
  };

  render() {
    const { gallery } = this.props;
    const { index } = this.state;

    return (
      <div className="carousel">
        <img src={gallery[index]} alt={gallery[index]}></img>
        {gallery.length > 1 && (
          <div className="carousel-buttons">
            <button onClick={() => this.showPrevImg()} id="prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#1D1F22"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button onClick={() => this.showNextImg()} id="next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#1D1F22"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
}
