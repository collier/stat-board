import React from 'react';
import cn from 'classnames';
import moment from 'moment';

import styles from './UpcomingEvent.module.css';

const UpcomingEvent = ({ eventDate, icon, name, displayTimeFlag }) => {
  const eventDateMoment = moment(eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  let formatString = 'dddd, MMMM Do';
  if(displayTimeFlag) {
    formatString += ' [@] h:mm A';
  }
  let eventDateStr = eventDateMoment.format(formatString);
  return (
    <div className={cn(styles.event, 'row')}>
      <div className="col-md-auto">
        <img className={styles.icon} src={`img/icons/${icon}`} alt="event-icon" />
      </div>
      <div className="col">
        <div className={styles.name}>{name}</div>
        <div className={styles.time}>{eventDateStr}</div>
      </div>
    </div>
  );
};

export default UpcomingEvent;