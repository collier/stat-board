import React, { Component } from 'react';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';
import FantasyMatchup from './FantasyMatchup';

import './FantasyMatchupSlide.css';

class FantasyMatchupSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      matchups: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderMatchups = this.renderMatchups.bind(this);
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
    axios.get('/api/fantasy-football/matchups')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          matchups: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  renderMatchups() {
    return this.state.matchups.map((matchup, index) => {
      return <FantasyMatchup {...matchup} key={index} />;
    });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="fantasy football matchups" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="fantasy football matchups" message="Loading..." />;
    } else {
      return (
        <Slide title="fantasy football matchups">
          <div className="slide__content d-flex justify-content-center">
            <div className="FantasyMatchups">
              {this.renderMatchups()}
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default FantasyMatchupSlide;