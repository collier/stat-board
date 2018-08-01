import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Slide from '../../components/Slide/Slide';

import './CorpEventsSlide.css';

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
    let currEvents = this.state.events;
    if(currEvents.length > countOfEventsToDisplay) {
      currEvents = this.state.events.slice(0, countOfEventsToDisplay);
    }
    return currEvents.map((event, index) => {
      const eventDate = moment(event.eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      // const today = moment();
      // const daysUntilEvent = eventDate.diff(today, 'days');
      // let formatString = '';
      // if(daysUntilEvent === 0) {
      //   formatString = '[Today]';
      // } else if(daysUntilEvent === 1) {
      //   formatString = '[Tomorrow]';
      // } else if(eventDate.day() > today.day() && daysUntilEvent <= 7) {
      //   formatString = '[This] dddd';
      // } else if((today.day() > eventDate.day() && daysUntilEvent <= 7) || (today.day() < eventDate.day() && daysUntilEvent < 14)) {
      //   formatString = '[Next] dddd';
      // } else {
      //   formatString = 'dddd, MMMM Do';
      // }
      let formatString = 'dddd, MMMM Do';
      if(event.displayTimeFlag) {
        formatString += ' [@] h:mm A';
      }
      let eventDateStr = eventDate.format(formatString);
      return (
        <div className="Event row" key={index}>
          <div className="col-md-auto">
            <img className="Event__Icon" src={`img/icons/${event.icon}`} alt="event-icon" />
          </div>
          <div className="col">
            <div className="Event__Name">{event.name}</div>
            <div className="Event__Time">{eventDateStr}</div>
          </div>
        </div>
      );
    })
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="corporate events & holidays" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="corporate events & holidays" message="Loading..." />;
    } else {
      return (
        <Slide title="corporate events & holidays">
          <div className="slide__content d-flex justify-content-center align-items-center">
            <div className="Events">
              {this.renderEvents()}
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default CorpEventsSlide;