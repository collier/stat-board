import React from 'react';

const UpcomingTrains = ({ trains, displayCount }) => {
  let displayedTrains = trains;
  if(displayedTrains.length > displayCount) {
    displayedTrains = trains.slice(0, displayCount);
  }
  return displayedTrains.map((train, index) => {
    const line = train.Line;
    const minutesAway = Math.floor(train.minutesAway);
    return (
      <div className="Metro__Station__Train d-flex justify-content-center" key={index}>
        <img className="Metro__Station__Train__Icon" src={`img/icons/metro/${line}.png`} alt="metro-line" />
        <span className="Metro__Station__Train__Text">{minutesAway} min</span>
      </div>
    );
  });
}

export default UpcomingTrains;