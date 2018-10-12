import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import cn from 'classnames';

import Slide from '../../components/Slide/Slide';

import UpcomingEvent from './UpcomingEvent';
import styles from './CorpEventsSlide.module.css';

class CorpEventsSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.nextSlide !== this.props.nextSlide && this.props.slideNumber === this.props.nextSlide) {
      this.fetchData();
    }
  }

  fetchData() {
    axios.get('/api/events')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          events: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  renderEvents() {
    const countOfEventsToDisplay = 5;
    let currEvents = this.state.events.slice(1);
    if(currEvents.length > countOfEventsToDisplay) {
      currEvents = this.state.events.slice(1, countOfEventsToDisplay + 1);
    }
    return currEvents.map((event, index) => (
      <UpcomingEvent {...event} key={index} />
    ));
  }

  render() {
    const { titleTheme, bodyTheme } = styles;
    const themes = { titleTheme, bodyTheme };
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <Slide title="corporate events & holidays" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="corporate events & holidays" message="Loading..." { ...themes } />;
    } else {
      const upNext = events[0];
      const upNextDate = moment(upNext.eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      let formatString = 'dddd, MMMM Do';
      if(upNext.displayTimeFlag) {
        formatString += ' [@] h:mm A';
      }
      let upNextDateStr = upNextDate.format(formatString);
      return (
        <Slide title="corporate events & holidays" { ...themes } >
          <div className="row h-100">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <div className={styles.upNext}>
                <div className={styles.sectionTitle}>Up Next</div>
                <img className={styles.upNextIcon} src={`img/icons/${upNext.icon}`} alt="event-icon" />
                <div className={styles.upNextName}>{upNext.name}</div>
                <div className={styles.upNextTime}>{upNextDateStr}</div>
              </div>
            </div>
            <div className="col-7">
              <div className={cn(styles.sectionTitle, styles.upcomingEventTitle)}>Upcoming Events</div>
              <div className="d-flex justify-content-center align-items-center">
                <div className={styles.upcomingEventList}>
                  {this.renderEvents()}
                </div>
              </div>
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default CorpEventsSlide;