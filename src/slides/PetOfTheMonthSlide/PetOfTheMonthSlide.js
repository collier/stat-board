import React, { Component } from 'react';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';

import './PetOfTheMonthSlide.css';

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
    const { error, isLoaded, pet } = this.state;
    if (error) {
      return <Slide title="pet of the month" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="pet of the month" message="Loading..." />;
    } else if (!pet) {
      return <Slide title="pet of the month" message="Coming Soon!" />;
    } else {
      const petName = {__html: pet.petName};
      return (
        <Slide title="pet of the month">
          <div className="row slide__content">
            <div className="col-5 PetStats">
              <div className="d-flex align-items-center h-22">
                <div className="Pet__Name">
                  <div className="Pet__Name__value" dangerouslySetInnerHTML={petName} />
                  <div className="Pet__Name__label">name</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-22">
                <div className="Pet__Owner">
                  <div className="Pet__Owner__value">{pet.ownerName}</div>
                  <div className="Pet__Owner__label">owner</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-20">
                <div className="Pet__Species">
                  <div className="Pet__Species__value">{pet.petSpecies}</div>
                  <div className="Pet__Species__label">breed/species</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-33">
                <div className="Pet__Description">{pet.description}</div>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <img className="Pet__Picture" src={`img/${pet.picture}`} alt="pet" />
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default PetOfTheMonthSlide;