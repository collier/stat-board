import React from 'react';

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
      colorClass = 'Metro__TrainTime__Badge--green';
      break;
    case 'SLOW':
      colorClass = 'Metro__TrainTime__Badge--orange';
      break;
    case 'DELAYED':
      colorClass = 'Metro__TrainTime__Badge--red';
      break;
    default:
  }
  const trainFreq = Math.floor(averageTrainFrequency);
  return (
    <div className={`Metro__TrainTime__Badge ${colorClass} d-flex`}>
      <i className="Metro__TrainTime__Badge__Icon material-icons">{icon}</i>
      <div className="Metro__TrainTime__Badge__Value">{trainFreq} min</div>
    </div>
  )
}

export default TrainTimeBadge;