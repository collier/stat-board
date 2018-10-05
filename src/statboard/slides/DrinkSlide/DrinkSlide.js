import React, { Component } from 'react';
import numeral from 'numeral';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';

import './DrinkSlide.css';

class DrinkSlide extends Component {

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
    axios.get('/api/drink-stats')
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
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <Slide title="drinks" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="drinks" message="Loading..." />;
    } else {
      const coffeeToday = numeral(stats.coffeeToday).format('0,0');
      const coffeeAllTime = numeral(stats.coffeeAllTime).format('0,0');
      const lacroix = numeral(stats.snackCounter.laCroixCansDrunk).format('0,0');
      const soda = numeral(1240).format('0,0');
      return (
        <Slide title="drinks">
          <div className="row slide__content">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <div className="row">
                <div className="CupsToday">
                  <div className="CupsToday__value">{coffeeToday}</div>
                  <div className="CupsToday__label">Cups of Coffee Today</div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="DrinkStat row">
                <div className="col-3 d-flex justify-content-center align-items-center">
                  <img src="img/icons/food/coffee-3.png" alt="icon" />
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="DrinkStat__value">{coffeeAllTime}</div>
                  </div>
                  <div className="row">
                    <div className="DrinkStat__label">Cups of Coffee All Time</div>
                  </div>
                </div>
              </div>
              <div className="DrinkStat row">
                <div className="col-3 d-flex justify-content-center align-items-center">
                  <img src="img/icons/food/can-1.png" alt="icon" />
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="DrinkStat__value">{lacroix}</div>
                  </div>
                  <div className="row">
                    <div className="DrinkStat__label DrinkStat__label--lacroix">CANS OF LaCROIX</div>
                  </div>
                </div>
              </div>
              <div className="DrinkStat row">
                <div className="col-3 d-flex justify-content-center align-items-center">
                  <img src="img/icons/food/can.png" alt="icon" />
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="DrinkStat__value">{soda}</div>
                  </div>
                  <div className="row">
                    <div className="DrinkStat__label">Cans of Soda</div>
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

export default DrinkSlide;