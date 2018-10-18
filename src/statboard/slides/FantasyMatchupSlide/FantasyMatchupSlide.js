import React, { Component } from 'react';
import axios from 'axios';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import FantasyMatchup from './FantasyMatchup';

import slideThemes from './FantasyMatchupSlideThemes.module.css';

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
          error: null,
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
    const themes = getSlideThemes(slideThemes, this.props.theme);
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="fantasy football matchups" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="fantasy football matchups" message="Loading..." { ...themes } />;
    } else {
      return (
        <Slide title="fantasy football matchups" { ...themes }>
          <div className="h-100 d-flex justify-content-center">
            <div className="w-100">
              {this.renderMatchups()}
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default FantasyMatchupSlide;