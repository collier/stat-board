import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import SkyIcon from './SkyIcon';

import Slide from '../../components/Slide/Slide';

import styles from './WeatherSlide.module.css';

class WeatherSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: {}
    };
    this.fetchData = this.fetchData.bind(this);
    this.buildFutureHours = this.buildFutureHours.bind(this);
    this.buildFutureDays = this.buildFutureDays.bind(this);
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
    axios.get('/api/weather')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          weather: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  buildFutureHours() {
    const { data } = this.state.weather.hourly;
    const weathers = data.slice(1, 4);
    return weathers.map((weather, index) => {
      const weatherLabel = moment.unix(weather.time).format('ha');
      const weatherTemp = Math.round(weather.temperature);
      return (
        <div className="col d-flex justify-content-center" key={index}>
          <div>
            <div className={styles.futureTempLabel}>
              {weatherLabel}
            </div>
            <SkyIcon 
              icon={weather.icon}
              objConf={{
                'color': 'white'
              }} 
              canvasConfig={{
                height: '150',
                width: '150'
              }}
            />
            <div className={styles.futureTemp}>
              {weatherTemp}°
            </div>
          </div>
        </div>
      );
    });
  }

  buildFutureDays() {
    const { data } = this.state.weather.daily;
    const weathers = data.slice(1, 4);
    return weathers.map((weather, index) => {
      const weatherLabel = moment.unix(weather.time).format('dddd');
      const weatherTempHigh = Math.round(weather.temperatureMax);
      const weatherTempLow = Math.round(weather.temperatureMin);
      return (
        <div className="col d-flex justify-content-center" key={index}>
          <div>
            <div className={styles.futureTempLabel}>
              {weatherLabel}
            </div>
            <SkyIcon 
              icon={weather.icon}
              objConf={{
                'color': 'white'
              }} 
              canvasConfig={{
                height: '150',
                width: '150'
              }}
            />
            <div className={styles.futureTemp}>
              {weatherTempHigh}°
            </div>
            <div className={styles.futureLowTemp}>
              {weatherTempLow}°
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { titleTheme, bodyTheme } = styles;
    const themes = { titleTheme, bodyTheme };
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="weather" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="weather" message="Loading..." { ...themes } />;
    } else {
      const { currently } = this.state.weather;
      const currTemp = Math.round(currently.temperature);
      const currFeelsLikeTemp = Math.round(currently.apparentTemperature);
      const currHumidity = Math.floor(currently.humidity * 100);
      const currWindSpeed = Math.round(currently.windSpeed);
      return (
        <Slide title="weather" { ...themes } >
          <div className="h-100">
            <div className="d-flex justify-content-center align-items-center h-50">
              <div className="row h-67">
                <div className="col-4 d-flex justify-content-end align-items-center">
                  <SkyIcon 
                    icon={currently.icon}
                    objConf={{
                      'color': 'white'
                    }} 
                    canvasConfig={{
                      height: '350',
                      width: '350'
                    }}
                  />
                </div>
                <div className="col-md-auto">
                  <div className={styles.currentTemp}>
                    {currTemp}°
                  </div>
                  <div className={styles.currentTempText}>
                    {currFeelsLikeTemp}° feels like 
                  </div>
                  <div className={styles.currentTempText}>
                    {currHumidity}% humidity 
                  </div>
                  <div className={styles.currentTempText}>
                    {currWindSpeed}mph winds
                  </div>
                </div>
                <div className="col-4">
                  <div className={styles.currentConditionsLabel}>conditions</div>
                  <div className={styles.currentConditionsValue}>{currently.summary}</div>
                </div>
              </div>
            </div>
            <div className="row h-50">
              <div className="col">
                <div className={styles.futureSectionTitle}>
                  hourly
                </div>
                <div className="row">
                  {this.buildFutureHours()}
                </div>
              </div>
              <div className="col">
                <div className={styles.futureDailyContainer}>
                  <div className={styles.futureSectionTitle}>
                    daily
                  </div>
                  <div className="row">
                    {this.buildFutureDays()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default WeatherSlide;