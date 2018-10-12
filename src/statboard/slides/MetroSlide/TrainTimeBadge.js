import React from 'react';
import cn from 'classnames';

import styles from './TrainTimeBadge.module.css';

const TrainTimeBadge = ({ platformWaitTimeTrendStatus, trainFrequencyStatus, averageTrainFrequency }) => {
  let icon = '';
  switch (platformWaitTimeTrendStatus) {
    case 'DECREASING':
      icon = 'trending_down';
      break;
    case 'INCREASING':
      icon = 'trending_up';
      break;
    case 'NEUTRAL':
    default:
  }
  let colorClass = '';
  switch (trainFrequencyStatus) {
    case 'OK':
      colorClass = styles.green;
      break;
    case 'SLOW':
      colorClass = styles.orange;
      break;
    case 'DELAYED':
      colorClass = styles.red;
      break;
    default:
  }
  const trainFreq = Math.floor(averageTrainFrequency);
  return (
    <div className={cn(styles.badge, colorClass, 'd-flex')}>
      <i className={cn(styles.icon, 'material-icons')}>{icon}</i>
      <div className={styles.minutes}>{trainFreq} min</div>
    </div>
  )
}

export default TrainTimeBadge;