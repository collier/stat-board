import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import SkyIcon from './SkyIcon';

import Slide from '../../components/Slide/Slide';

import './WeatherSlide.css';

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
          <div className="FutureWeather__Item">
            <div className="FutureWeather__Label">
              {weatherLabel}
            </div>
            <div className="FutureWeather__Icon">
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
            </div>
            <div className="FutureWeather__Temp">
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
          <div className="FutureWeather__Item">
            <div className="FutureWeather__Label">
              {weatherLabel}
            </div>
            <div className="FutureWeather__Icon">
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
            </div>
            <div className="FutureWeather__Temp">
              {weatherTempHigh}°
            </div>
            <div className="FutureWeather__Temp--Low">
              {weatherTempLow}°
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="weather" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="weather" message="Loading..." />;
    } else {
      const { currently } = this.state.weather;
      const currTemp = Math.round(currently.temperature);
      const currFeelsLikeTemp = Math.round(currently.apparentTemperature);
      const currHumidity = Math.floor(currently.humidity * 100);
      const currWindSpeed = Math.round(currently.windSpeed);
      return (
        <Slide title="weather">
          <div className="slide__content">
            <div className="CurrentWeatherContainer d-flex justify-content-center align-items-center">
              <div className="CurrentWeather row">
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
                  <div className="CurrentWeather__TempContainer">
                    <div className="CurrentWeather__Temp">
                      {currTemp}°
                    </div>
                    <div className="CurrentWeather__TempDesc">
                      {currFeelsLikeTemp}° feels like 
                    </div>
                    <div className="CurrentWeather__TempDesc">
                      {currHumidity}% humidity 
                    </div>
                    <div className="CurrentWeather__TempDesc">
                      {currWindSpeed}mph winds
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="CurrentWeather__ConditionsContainer">
                    <div className="CurrentWeather__ConditionsLabel">conditions</div>
                    <div className="CurrentWeather__ConditionsDesc">
                      {currently.summary}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="FutureWeatherContainer row">
              <div className="col">
                <div className="FutureWeather__HourlyContainer">
                  <div className="FutureWeather__SectionLabel">
                    hourly
                  </div>
                  <div className="row">
                    {this.buildFutureHours()}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="FutureWeather__DailyContainer">
                  <div className="FutureWeather__SectionLabel">
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