import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';

import styles from './LeaderboardMember.module.css';

const LeaderboardMember = ({ name, completion_days, local_score, stars }) => {
  // const today = moment();
  // const chirstmas = moment('12-25', 'MM-DD');
  const today = moment('2017-12-20', 'YYYY-MM-DD');
  const chirstmas = moment('2017-12-25', 'YYYY-MM-DD');
  const duration = moment.duration(chirstmas.diff(today));
  const days = duration.asDays();
  const daysPast = Math.floor(25 - days);
  let starComponents = null;
  if(daysPast >= 0 && daysPast <= 25) {
    starComponents = Array.from(Array(25).keys()).map((val, i) => {
      const starCount = completion_days[i+1];
      var starColor = cn({
        [styles.grey] : starCount === 0 || isUndefined(starCount),
        [styles.silver] : starCount === 1,
        [styles.gold] : starCount === 2
      });
      return <div className={cn('text-center', starColor, styles.star)} key={i}>*</div>;
    });
  }
  return (
    <div className={cn('row', styles.memberRow)}>
      <div className={cn('d-flex justify-content-center align-items-center', styles.scoreContainer)}>
        <div>{local_score}</div>
      </div>
      <div className={cn('d-flex justify-content-end align-items-center', styles.nameContainer)}>
        <div>{name}</div>
      </div>
      <div className={cn('d-flex', styles.starList)}>
        {starComponents}
      </div>
    </div>
  );
}

export default LeaderboardMember;