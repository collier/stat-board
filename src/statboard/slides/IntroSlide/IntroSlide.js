import React, { Component } from 'react';
import moment from 'moment';
import cn from 'classnames';

import styles from './IntroSlide.module.css';

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
    const datetime = this.state.time.format('MMMM Do, YYYY – h:mm:ss A');
    return (
      <div className={styles.slideBody}>
        <div className="row justify-content-center align-items-center h-100">
          <div>
            <img src="img/CPT_Horizontal_White.png" alt="c20g-logo" />
            <div className={styles.appName}>STAT BOARD</div>
            <div className={styles.dateTime}>{datetime}</div>
          </div>
          <div className={cn('d-flex align-items-end', styles.footer)}>
            <span className={styles.footerText}>powered by</span>
            <img className={styles.footerLogo} src="img/go.png" alt="go-gopher" />
            <img className={styles.footerLogo} src="img/react.png" alt="react-logo" />
          </div>
        </div>
      </div>
    );
  }

} 

export default IntroSlide;