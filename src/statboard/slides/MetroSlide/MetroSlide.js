import React, { Component } from 'react';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';
import TrainTimeBadge from './TrainTimeBadge';
import MetroAlerts from './MetroAlerts';
import UpcomingTrains from './UpcomingTrains';

import styles from './MetroSlide.module.css';

class MetroSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stats: {}
    };
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
    axios.get('/api/metro-stats')
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

  render() {
    const { titleTheme, bodyTheme } = styles;
    const themes = { titleTheme, bodyTheme };
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <Slide title="metro" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="metro" message="Loading..." { ...themes } />;
    } else {
      const { greensboro, tysons, silverLineMetrics } = stats;
      const minutesAway = Math.floor(greensboro.expectedRideTime);
      return (
        <Slide title="metro" { ...themes }>
          <div className="h-100">
            <div className="row h-50">
              <div className="col">
                <div className="Metro__Station">
                  <div className={styles.sectionTitle}>Greensboro Station</div>
                  <div className="Metro__Station__Upcoming">
                    <UpcomingTrains trains={greensboro.fromStationTrainStatuses} displayCount={3} />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="Metro__Station">
                  <div className={styles.sectionTitle}>Tysons Corner Station</div>
                  <div className="Metro__Station__Upcoming">
                    <UpcomingTrains trains={tysons.fromStationTrainStatuses} displayCount={3} />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="MinutesToDest">
                  <div className={styles.sectionTitle}>Ride Time to Metro Center</div>
                  <div className={styles.rideTime}>
                    <span>{minutesAway}</span>
                    <span className={styles.rideTimeUnits}>min</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row h-50">
              <div className="col">
                <div className="Metro__TrainTime h-100">
                  <div className={styles.sectionTitle}>Time Between Trains</div>
                  <div className="Metro__TrainTime__Container d-flex justify-content-center align-items-center h-75">
                    <TrainTimeBadge 
                      platformWaitTimeTrendStatus={silverLineMetrics.platformWaitTimeTrendStatus}
                      trainFrequencyStatus={silverLineMetrics.trainFrequencyStatus}
                      averageTrainFrequency={silverLineMetrics.averageTrainFrequency}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="Metro__Alert h-100">
                  <div className={styles.sectionTitle}>Metro Alerts</div>
                  <MetroAlerts alerts={greensboro.metroAlerts} displayCount={2} />
                </div>
              </div>s
            </div>
          </div>
        </Slide>
      );
    }
  }
}

export default MetroSlide;