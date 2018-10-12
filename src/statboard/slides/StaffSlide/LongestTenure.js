import React from 'react';
import moment from 'moment';

import styles from './LongestTenure.module.css';

const LongestTenure = ({ startDate, name }) => {
  const today = moment();
  const start = moment(startDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  const years = today.diff(start, 'year');
  start.add(years, 'years');
  const months = today.diff(start, 'months');
  start.add(months, 'months');
  const days = today.diff(start, 'days');
  return (
    <div className={styles.longestTenure}>
      <div className={styles.label}>longest tenure</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.duration}>
        <span className={styles.timeNumber}>{years}</span>
        <span className={styles.timeLabel}>years</span>
        <span className={styles.timeNumber}>{months}</span>
        <span className={styles.timeLabel}>months</span>
        <span className={styles.timeNumber}>{days}</span>
        <span className={styles.timeLabel}>days</span>
      </div>
    </div>
  );
}

export default LongestTenure;