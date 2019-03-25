import React, { Component } from 'react';
import axios from 'axios';
import cn from 'classnames';

import Slide from '../../components/Slide/Slide';
import getSlideThemes from '../../util/getSlideThemes';

import styles from './MarchMadnessSlide.module.css';
import slideThemes from './MarchMadnessSlideThemes.module.css';

class MarchMadnessSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      marchMadnessMembers: []
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
    axios.get('/api/march-madness')
      .then((response) => {
        this.setState(() => ({
          error: null,
          isLoaded: true,
          marchMadnessMembers: response.data
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
    let topMembers = this.state.marchMadnessMembers;
    if(topMembers.length > 10) {
      topMembers = topMembers.slice(0, 10);
    }
    return topMembers.map((member, index) => {
      return (
        <div className={cn('row', styles.entryRow)} key={index}>
          <div className={cn('col-1 d-flex justify-content-end align-items-center', styles.rowText)}>
            <div>{member.isTied ? '*' : ''}{member.rank}</div>
          </div>
          <div className={cn('col-3 d-flex align-items-center', styles.rowText)}>
            <div>{member.displayName}</div>
          </div>
          <div className={cn('col d-flex justify-content-center align-items-center', styles.rowText)}>
            <div>{member.points}</div>
          </div>
          <div className={cn('col d-flex justify-content-center align-items-center', styles.rowText)}>
            <div>{member.maxPoints}</div>
          </div>
          <div className="col-1">
            <img className={styles.teamChampionLogo} src={member.teamChampionLogoUrl} />
          </div>
          <div className={cn('col-3 d-flex align-items-center', styles.rowText)}>
            <div>{member.teamChampionName}</div>
          </div>
          <div className={cn('col-1 d-flex justify-content-center align-items-center', styles.rowText)}>
            <div>{Math.floor(member.percentile)}%</div>
          </div>
        </div>
      );
    });
  }

  render() {
    const themes = getSlideThemes(slideThemes, this.props.theme);
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="march madness bracket competition" message="Whoops, something broke." { ...themes } />;
    } else if (!isLoaded) {
      return <Slide title="march madness bracket competition" message="Loading..." { ...themes } />;
    } else {
      return (
        <Slide title="march madness bracket competition" { ...themes }>
          <div className="h-100 d-flex justify-content-center">
            <div className="w-67">
              <div className={cn('row', styles.entryRow)}>
                <div className={cn('col-1 d-flex justify-content-end align-items-center', styles.columnHeader)}>
                  <div>rank</div>
                </div>
                <div className={cn('col-3 d-flex align-items-center', styles.columnHeader)}>
                  <div>user</div>
                </div>
                <div className={cn('col d-flex justify-content-center align-items-center', styles.columnHeader)}>
                  <div>points</div>
                </div>
                <div className={cn('col d-flex justify-content-center align-items-center', styles.columnHeader)}>
                  <div>max</div>
                </div>
                <div className={cn('col-4 d-flex align-items-center', styles.columnHeader)}>
                  <div>champion team</div>
                </div>
                <div className={cn('col-1 d-flex justify-content-center align-items-center', styles.columnHeader)}>
                  <div>percentile</div>
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

export default MarchMadnessSlide;