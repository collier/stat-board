import React, { Component } from 'react';
import moment from 'moment';

import './IntroSlide.css';

class IntroSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: moment()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment()
    });
  }

  render() {
    const datetime = this.state.time.format('MMMM do, YYYY – h:mm:ss A');
    return (
      <div className="slide slide--introduction">
        <div className="slide__content row justify-content-center align-items-center">
          <div className="Title">
            <img src="img/CPT_Horizontal_White.png" alt="c20g-logo" />
            <div className="AppName">
              STAT BOARD
            </div>
            <div className="DateTime">{datetime}</div>
          </div>
          <div className="PoweredBy d-flex align-items-end">
            <span className="PoweredBy__Text">powered by</span>
            <img className="PoweredBy__Logo" src="img/go.png" alt="go-gopher" />
            <img className="PoweredBy__Logo" src="img/react.png" alt="react-logo" />
          </div>
        </div>
      </div>
    );
  }

} 

export default IntroSlide;