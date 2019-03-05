import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import styles from './CountdownSlide.module.css';
import slideThemes from './CountdownSlideThemes.module.css';

class CountdownSlide extends Component {

  constructor(props) {
    super(props);
    const remainingTimeObject = this.getRemainingTimeObject(props.eventTime);
    const { 
      daysRemaining, 
      hoursRemaining, 
      minutesRemaining, 
      secondsRemaining 
    } = remainingTimeObject;
    this.state = {
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
    };
    this.tick = this.tick.bind(this);
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
    const remainingTimeObject = this.getRemainingTimeObject(this.props.eventTime);
    this.setState(remainingTimeObject);
  }

  getRemainingTimeObject(eventTimeStr) {
    let today = moment();
    const eventTime = moment(eventTimeStr, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    const days = eventTime.diff(today, 'days');
    today.add(days, 'days');
    const hours = eventTime.diff(today, 'hours');
    today.add(hours, 'hours');
    const minutes = eventTime.diff(today, 'minutes');
    today.add(minutes, 'minutes');
    const seconds = eventTime.diff(today, 'seconds');
    return {
      daysRemaining: days,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      secondsRemaining: seconds
    };
  }

  render() {
    const themes = getSlideThemes(slideThemes, this.props.theme);
    const { eventName, eventImg } = this.props;
    const { 
      daysRemaining, 
      hoursRemaining, 
      minutesRemaining, 
      secondsRemaining 
    } = this.state;
    return (
      <Slide title={`countdown to ${eventName}`} { ...themes }>
        <div className="row h-100">
          <div className={cn('col-5', styles.textContainer)}>
            <div className="d-flex align-items-center h-27">
              <div>
                <div className={styles.titleLabel}>Countdown to:</div>
                <div className={styles.title}>{eventName}</div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center h-17">
              <div className={styles.time}>{daysRemaining}</div>
              <div className={styles.timeLabel}>days</div>
            </div>
            <div className="d-flex align-items-center justify-content-center h-17">
              <div className={styles.time}>{hoursRemaining}</div>
              <div className={styles.timeLabel}>hours</div>
            </div>
            <div className="d-flex align-items-center justify-content-center h-17">
              <div className={styles.time}>{minutesRemaining}</div>
              <div className={styles.timeLabel}>minutes</div>
            </div>
            <div className="d-flex align-items-center justify-content-center h-17">
              <div className={styles.time}>{secondsRemaining}</div>
              <div className={styles.timeLabel}>seconds</div>
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <img className={styles.eventImg} src={eventImg} alt="event" />
          </div>
        </div>
      </Slide>
    );
  }

}

export default CountdownSlide;