import React, { Component } from 'react';
import axios from 'axios';
import cn from 'classnames';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import LeaderboardMember from './LeaderboardMember';

import styles from './AdventOfCodeSlide.module.css';
import slideThemes from './AdventOfCodeSlideThemes.module.css';

class AdventOfCodeSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      leaderboardMembers: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
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
    axios.get('/api/aoc-leaderboard')
      .then((response) => {
        this.setState(() => ({
          error: null,
          isLoaded: true,
          leaderboardMembers: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  renderLeaderBoard() {
    let topMembers = this.state.leaderboardMembers;
    if(topMembers.length > 10) {
      topMembers = topMembers.slice(0, 10);
    }
    return topMembers.map((member, index) => {
      return <LeaderboardMember {...member} key={index} />;
    });
  }

  renderDays() {
    return Array.from(Array(25).keys()).map((val, i) => {
      const dayNumber = i + 1;
      return <div className={cn('text-center', styles.day)} key={dayNumber}>{dayNumber}</div>
    });
  }

  render() {
    const themes = getSlideThemes(slideThemes, this.props.theme);
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="advent of code" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="advent of code" message="Loading..." { ...themes } />;
    } else {
      return (
        <Slide title="advent of code" { ...themes }>
          <div className="h-100 d-flex justify-content-center">
            <div className="w-95">
              <div className={cn('row', styles.label)}>
                <div className={cn('text-center', styles.scoreLabel)}>SCORE</div>
                <div className={styles.nameGap}></div>
                <div className={cn('d-flex', styles.daysList)}>
                  {this.renderDays()}
                </div>
              </div>
              {this.renderLeaderBoard()}
            </div>
          </div>
        </Slide>
      );
    }
  }

}

export default AdventOfCodeSlide;