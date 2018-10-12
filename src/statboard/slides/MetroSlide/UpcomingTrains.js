import React from 'react';
import cn from 'classnames';

import styles from './UpcomingTrains.module.css';

const UpcomingTrains = ({ trains, displayCount }) => {
  let displayedTrains = trains;
  if(displayedTrains.length > displayCount) {
    displayedTrains = trains.slice(0, displayCount);
  }
  return displayedTrains.map((train, index) => {
    const line = train.Line;
    const minutesAway = Math.floor(train.minutesAway);
    return (
      <div className={cn(styles.upcomingTrain, 'd-flex justify-content-center')} key={index}>
        <img className={styles.icon} src={`img/icons/metro/${line}.png`} alt="metro-line" />
        <span className={styles.text}>{minutesAway} min</span>
      </div>
    );
  });
}

export default UpcomingTrains;