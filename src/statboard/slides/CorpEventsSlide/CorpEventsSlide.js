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
    let currEvents = this.state.events.slice(1);
    if(currEvents.length > countOfEventsToDisplay) {
      currEvents = this.state.events.slice(1, countOfEventsToDisplay + 1);
    }
    return currEvents.map((event, index) => {
      const eventDate = moment(event.eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
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
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <Slide title="corporate events & holidays" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="corporate events & holidays" message="Loading..." />;
    } else {
      const upNext = events[0];
      const upNextDate = moment(upNext.eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      let formatString = 'dddd, MMMM Do';
      if(upNext.displayTimeFlag) {
        formatString += ' [@] h:mm A';
      }
      let upNextDateStr = upNextDate.format(formatString);
      return (
        <Slide title="corporate events & holidays">
          <div className="row slide__content">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <div className="UpNextEvent">
                <div className="UpNextEvent__Title">Up Next</div>
                <img className="UpNextEvent__Icon" src={`img/icons/${upNext.icon}`} alt="event-icon" />
                <div className="UpNextEvent__Name">{upNext.name}</div>
                <div className="UpNextEvent__Time">{upNextDateStr}</div>
              </div>
            </div>
            <div className="col-7">
              <div className="Events__Title">Upcoming Events</div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="Events">
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