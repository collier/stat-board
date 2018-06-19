import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

import Slide from '../../components/Slide/Slide';

import './StaffSlide.css';

class StaffSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stats: {}
    };
    this.renderBirthdays = this.renderBirthdays.bind(this);
    this.renderAnniversaries = this.renderAnniversaries.bind(this);
    this.fetchData = this.fetchData.bind(this);
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
    axios.get('/api/staff-stats')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          stats: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  renderBirthdays() {
    const birthdays = this.state.stats.staffBirthdays;
    if(birthdays.length) {
      return birthdays.map((bday, index) => 
        <div className="Birthdays__value" key={index}>{bday.name}</div>
      );
    } else {
      return <div className="Birthdays__value Birthdays__value--empty">N/A</div>;
    }
  }

  renderAnniversaries() {
    const anniversaries = this.state.stats.anniversaries;
    if(anniversaries.length) {
      const today = moment();
      /**
       * I know, I know...trying not to import all of lodash to use chain, and 
       * couldn't get flow to work...fuck it.
       */
      const results = reverse(map(groupBy(map(anniversaries, (anniversary, index) => {
        const start = moment(anniversary.startDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        anniversary.years = today.diff(start, 'year');
        return anniversary;
      }), 'years'), (yearGroup, year) => {
        const phrase = year === '1' ? 'year' : 'years';
        const anniversaries = yearGroup.map((anniversary, index) => {
          return (
            <div className="Anniversary" key={index}>{anniversary.name}</div>
          );
        });
        return (
          <div className="AnniversaryGroup" key={year}>
            <div className="AnniversaryYear">{year} {phrase}</div>
            {anniversaries}
          </div>
        );
      }));
      return results;
    } else {
      return <div className="Anniversary Anniversary--empty">N/A</div>;
    }
  }

  render() {
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <Slide title="staff" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="staff" message="Loading..." />;
    } else {
      const { numberOfStaff, longestTenure } = stats;
      const today = moment();
      const start = moment(longestTenure.startDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      const years = today.diff(start, 'year');
      start.add(years, 'years');
      const months = today.diff(start, 'months');
      start.add(months, 'months');
      const days = today.diff(start, 'days');
      return (
        <Slide title="staff">
          <div className="row slide__content">
            <div className="col">
              <div className="d-flex justify-content-center align-items-center h-50">
                <div className="NumberOfStaff">
                  <div className="NumberOfStaff__value">{numberOfStaff}</div>
                  <div className="NumberOfStaff__label">number of staff</div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-50">
                <div className="LongestTenure">
                  <div className="LongestTenure__label">longest tenure</div>
                  <div className="LongestTenure__name">{longestTenure.name}</div>
                  <div className="LongestTenure__length">
                    <span className="LongestTenure__Number">{years}</span>
                    <span className="LongestTenure__NumberLabel">years</span>
                    <span className="LongestTenure__Number">{months}</span>
                    <span className="LongestTenure__NumberLabel">months</span>
                    <span className="LongestTenure__Number">{days}</span>
                    <span className="LongestTenure__NumberLabel">days</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center align-items-center h-50">
                <div className="Birthdays">
                  <div className="Birthdays__label d-flex justify-content-center">
                    <img className="Birthdays__icon" src="img/icons/celebrations/017-balloons.png" alt="balloons" /> 
                    <span className="Birthdays__label__text">today's birthdays</span>
                    <img className="Birthdays__icon" src="img/icons/celebrations/017-balloons.png" alt="balloons" /> 
                  </div>
                  {this.renderBirthdays()}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-50">
                <div className="Anniversaries">
                  <div className="Anniversaries__label d-flex justify-content-center">
                    <img className="Anniversaries__icon" src="img/icons/celebrations/050-confetti.png" alt="balloons" /> 
                    <span className="Anniversaries__label__text">today's anniversaries</span>
                    <img className="Anniversaries__icon" src="img/icons/celebrations/050-confetti.png" alt="balloons" /> 
                  </div>
                  {this.renderAnniversaries()}
                </div>
              </div>
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default StaffSlide;