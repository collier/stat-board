import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import cn from 'classnames';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

import Slide from '../../components/Slide/Slide';

import LongestTenure from './LongestTenure';
import styles from './StaffSlide.module.css';

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
        <div className={styles.birthdayName} key={index}>{bday.name}</div>
      );
    } else {
      return <div className={styles.emptyList}>N/A</div>;
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
            <div className={styles.anniversaryName} key={index}>{anniversary.name}</div>
          );
        });
        return (
          <div className={styles.anniversaryGroup} key={year}>
            <div className={styles.anniversaryYear}>{year} {phrase}</div>
            {anniversaries}
          </div>
        );
      }));
      return results;
    } else {
      return <div className={styles.emptyList}>N/A</div>;
    }
  }

  render() {
    const { titleTheme, bodyTheme } = styles;
    const themes = { titleTheme, bodyTheme };
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <Slide title="staff" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="staff" message="Loading..." { ...themes } />;
    } else {
      const { numberOfStaff, longestTenure } = stats;
      return (
        <Slide title="staff" { ...themes }>
          <div className="row h-100">
            <div className="col">
              <div className="d-flex justify-content-center align-items-center h-50">
                <div>
                  <div className={styles.numberOfStaff}>{numberOfStaff}</div>
                  <div className={styles.numberOfStaffLabel}>number of staff</div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-50">
                <LongestTenure {...longestTenure} />
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center align-items-center h-50">
                <div>
                  <div className={cn(styles.dailyHighlightLabel, 'd-flex justify-content-center')}>
                    <img className={styles.icon} src="img/icons/celebrations/017-balloons.png" alt="balloons" /> 
                    <span className={styles.dailyHighlightLabelText}>today's birthdays</span>
                    <img className={styles.icon} src="img/icons/celebrations/017-balloons.png" alt="balloons" /> 
                  </div>
                  {this.renderBirthdays()}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-50">
                <div>
                  <div className={cn(styles.dailyHighlightLabel, 'd-flex justify-content-center')}>
                    <img className={styles.icon} src="img/icons/celebrations/050-confetti.png" alt="confetti" /> 
                    <span className={styles.dailyHighlightLabelText}>today's anniversaries</span>
                    <img className={styles.icon} src="img/icons/celebrations/050-confetti.png" alt="confetti" /> 
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