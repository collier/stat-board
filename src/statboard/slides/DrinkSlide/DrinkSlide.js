import React, { Component } from 'react';
import numeral from 'numeral';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';

import DrinkStat from './DrinkStat';
import styles from './DrinkSlide.module.css';

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
    const { titleTheme, bodyTheme } = styles;
    const themes = { titleTheme, bodyTheme };
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <Slide title="drinks" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="drinks" message="Loading..." { ...themes } />;
    } else {
      const coffeeToday = numeral(stats.coffeeToday).format('0,0');
      const coffeeAllTime = numeral(stats.coffeeAllTime).format('0,0');
      const lacroix = numeral(stats.snackCounter.laCroixCansDrunk).format('0,0');
      const soda = numeral(1240).format('0,0');
      return (
        <Slide title="drinks" { ...themes }>
          <div className="row h-100">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <div className="row">
                <div>
                  <div className={styles.cupsToday}>{coffeeToday}</div>
                  <div className={styles.cupsTodayLabel}>Cups of Coffee Today</div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <DrinkStat 
                icon="food/coffee-3.png" 
                label="Cups of Coffee All Time" 
                value={coffeeAllTime} 
              />
              <DrinkStat 
                icon="food/can-1.png" 
                label="CANS OF LaCROIX" 
                value={lacroix} 
              />
              <DrinkStat 
                icon="food/can.png" 
                label="Cans of Soda" 
                value={soda} 
              />
            </div>
          </div>
        </Slide>
      );
    }
  }
}

export default DrinkSlide;