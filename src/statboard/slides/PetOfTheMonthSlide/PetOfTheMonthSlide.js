import React, { Component } from 'react';
import axios from 'axios';
import cn from 'classnames';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import styles from './PetOfTheMonthSlide.module.css';
import slideThemes from './PetOfTheMonthSlideThemes.module.css';

class PetOfTheMonthSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pet: {}
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
    axios.get('/api/pet-of-the-month')
      .then((response) => {
        this.setState(() => ({
          error: null,
          isLoaded: true,
          pet: response.data
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
    const themes = getSlideThemes(slideThemes, this.props.theme);
    const { error, isLoaded, pet } = this.state;
    if (error) {
      return <Slide title="pet of the month" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="pet of the month" message="Loading..." { ...themes } />;
    } else if (!pet) {
      return <Slide title="pet of the month" message="Coming Soon!" { ...themes } />;
    } else {
      const petName = {__html: pet.petName};
      return (
        <Slide title="pet of the month" { ...themes }>
          <div className="row h-100">
            <div className={cn('col-5', styles.petStatsContainer)}>
              <div className="d-flex align-items-center h-22">
                <div className="Pet__Name">
                  <div className={styles.petStatValue} dangerouslySetInnerHTML={petName} />
                  <div className={styles.petStatLabel}>name</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-22">
                <div className={styles.petStat}>
                  <div className={styles.petStatValue}>{pet.ownerName}</div>
                  <div className={styles.petStatLabel}>owner</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-20">
                <div className={styles.petStat}>
                  <div className={styles.petStatValue}>{pet.petSpecies}</div>
                  <div className={styles.petStatLabel}>breed/species</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-33">
                <div className={styles.petDescription}>{pet.description}</div>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <img className={styles.petPicture} src={`img/${pet.picture}`} alt="pet" />
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default PetOfTheMonthSlide;