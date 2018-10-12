import React from 'react';
import cn from 'classnames';

import styles from './Competition.module.css';

const Competition = ({ icon, winner, name }) => {
  const winnerHtml = {__html: winner};
  return (
    <div className={styles.competition}>
      <div className={cn(styles.iconContainer, 'd-flex justify-content-center align-items-center')}>
        <img className={styles.icon} src={`img/icons/${icon}`} alt="icon" />
      </div>
      <div className={styles.winnerName} dangerouslySetInnerHTML={winnerHtml} />
      <div className={styles.competitionName}>{name}</div>
    </div>
  )
}

export default Competition;