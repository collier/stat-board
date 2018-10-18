import React from 'react';
import cn from 'classnames';

import styles from './FantasyMatchup.module.css';

const FantasyMatchup = ({ homeTeam, awayTeam, matchup }) => {
  let homeLogo = homeTeam.logoUrl;
  if(!homeLogo) {
    homeLogo = 'img/ghost_person.png';
  }
  let awayLogo = awayTeam.logoUrl;
  if(!awayLogo) {
    awayLogo = 'img/ghost_person.png';
  }
  const homeOwner = {
    firstName: homeTeam.owners[0].firstName,
    lastName: homeTeam.owners[0].lastName
  }
  const awayOwner = {
    firstName: awayTeam.owners[0].firstName,
    lastName: awayTeam.owners[0].lastName
  }
  const homeOwnerName = `${homeOwner.firstName} ${homeOwner.lastName}`;
  const awayOwnerName = `${awayOwner.firstName} ${awayOwner.lastName}`;
  return (
    <div className={cn('row', styles.matchup)}>
      <div className="col">
        <div className="d-flex">
          <div className={styles.teamDetailsContainer}>
            <div className={cn('text-right', styles.teamName)}>
              {homeTeam.teamLocation} {homeTeam.teamNickname}
            </div>
            <div className={cn('text-right', styles.teamDetails)}>
              <span>{homeOwnerName}</span>
              <span className={styles.teamDetailsSeperator}>·</span>
              <span className={cn('text-right', styles.record)}>
                {homeTeam.record.overallWins}-{homeTeam.record.overallLosses}
              </span>
            </div>
          </div>
          <div className={cn('d-flex justify-content-center', styles.logoContainer)}>
            <img className={styles.logo} src={homeLogo} alt="home-logo" />
          </div>
          <div className={cn('d-flex justify-content-center align-items-center', styles.scoreContainer)}>
            <div className={styles.score}>{matchup.homeTeamScores[0]}</div>
          </div>
        </div>
      </div>
      <div className={styles.scoreSeperator}>-</div>
      <div className="col">
        <div className="d-flex">
          <div className={cn('d-flex justify-content-center align-items-center', styles.scoreContainer)}>
            <div className={styles.score}>{matchup.awayTeamScores[0]}</div>
          </div>
          <div className={cn('d-flex justify-content-center', styles.logoContainer)}>
            <img className={styles.logo} src={awayLogo} alt="away-logo" />
          </div>
          <div className={styles.teamDetailsContainer}>
            <div className={styles.teamName}>{awayTeam.teamLocation} {awayTeam.teamNickname}</div>
            <div className={styles.teamDetails}>
              <span className={styles.record}>{awayTeam.record.overallWins}-{awayTeam.record.overallLosses}</span>
              <span className={styles.teamDetailsSeperator}>·</span>
              <span>{awayOwnerName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FantasyMatchup;