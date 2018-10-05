import React from 'react';

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
    <div className="FantasyMatchup row">
      <div className="col">
        <div className="HomeTeam row">
          <div className="NameContainer">
            <div className="HomeTeam__Name">{homeTeam.teamLocation} {homeTeam.teamNickname}</div>
            <div className="HomeTeam__Details">
              <span className="HomeTeam__Owner">{homeOwnerName}</span>
              <span className="HomeTeam__DetailsSeperator">·</span>
              <span className="HomeTeam__Record">{homeTeam.record.overallWins}-{homeTeam.record.overallLosses}</span>
            </div>
          </div>
          <div className="LogoContainer d-flex justify-content-center">
            <img className="HomeTeam__Logo" src={homeLogo} alt="home-logo" />
          </div>
          <div className="ScoreContainer d-flex justify-content-center align-items-center">
            <div className="HomeTeam__Score">{matchup.homeTeamScores[0]}</div>
          </div>
        </div>
      </div>
      <div className="ScoreSeperator">-</div>
      <div className="col">
        <div className="AwayTeam row">
          <div className="ScoreContainer d-flex justify-content-center align-items-center">
            <div className="AwayTeam__Score">{matchup.awayTeamScores[0]}</div>
          </div>
          <div className="LogoContainer d-flex justify-content-center">
            <img className="AwayTeam__Logo" src={awayLogo} alt="away-logo" />
          </div>
          <div className="NameContainer">
            <div className="AwayTeam__Name">{awayTeam.teamLocation} {awayTeam.teamNickname}</div>
            <div className="AwayTeam__Details">
              <span className="AwayTeam__Record">{awayTeam.record.overallWins}-{awayTeam.record.overallLosses}</span>
              <span className="AwayTeam__DetailsSeperator">·</span>
              <span className="AwayTeam__Owner">{awayOwnerName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FantasyMatchup;