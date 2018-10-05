import React, { Component } from 'react';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';
import Competition from './Competition';

import './CompetitionSlide.css';

class CompetitionSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      competitions: []
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
    axios.get('/api/competitions')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          competitions: response.data
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
    const { error, isLoaded, competitions } = this.state;
    if (error) {
      return <Slide title="staff" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="staff" message="Loading..." />;
    } else {
      return (
        <Slide title="competition">
          <div className="slide__content">
            <div className="row">
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[0]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[1]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[2]} />
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[3]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[4]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[5]} />
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[6]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[7]} />
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <Competition {...competitions[8]} />
              </div>
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default CompetitionSlide;