import React from 'react';

const Competition = ({ icon, winner, name }) => {
  const winnerHtml = {__html: winner};
  return (
    <div className="Competition">
      <div className="Competition__icon d-flex justify-content-center align-items-center">
        <img src={`img/icons/${icon}`} alt="icon" />
      </div>
      <div className="Competition__winner" dangerouslySetInnerHTML={winnerHtml} />
      <div className="Competition__name">{name}</div>
    </div>
  )
}

export default Competition;