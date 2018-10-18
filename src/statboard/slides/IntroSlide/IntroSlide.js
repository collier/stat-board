import React, { Component } from 'react';
import moment from 'moment';
import cn from 'classnames';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import styles from './IntroSlide.module.css';
import slideThemes from './IntroSlideThemes.module.css';

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
    const appNameTheme = slideThemes[`appName${this.props.theme}`];
    const themes = getSlideThemes(slideThemes, this.props.theme);
    return (
      <Slide title="introduction" { ...themes } >
        <div className="h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div>
              <img src="img/CPT_Horizontal_White.png" alt="c20g-logo" />
              <div className={cn(styles.appName, appNameTheme)}>STAT BOARD</div>
              <div className={styles.dateTime}>{datetime}</div>
            </div>
            <div className={cn('d-flex align-items-end', styles.footer)}>
              <span className={styles.footerText}>powered by</span>
              <img className={styles.footerLogo} src="img/go.png" alt="go-gopher" />
              <img className={styles.footerLogo} src="img/react.png" alt="react-logo" />
            </div>
          </div>
        </div>
      </Slide>
    );
  }

} 

export default IntroSlide;