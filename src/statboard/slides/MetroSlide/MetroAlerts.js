import React from 'react';

const EmptyAlerts = () => (
  <div className="Metro__Alert__EmptyContainer d-flex justify-content-center align-items-center h-75">
    <div className="Metro__Alert__Empty">No Alerts</div>
    <img className="Metro__Alert__Empty__Icon" src="img/icons/entertainment/026-confetti.png" alt="no-alerts" />
  </div>
);

const MetroAlerts = ({ alerts, displayCount }) => {
  let displayedAlerts = alerts;
  if(!displayedAlerts) {
    return <EmptyAlerts />;
  } else if (displayedAlerts.length > displayCount) {
    displayedAlerts = alerts.slice(0, displayCount);
  }
  const alertJsx = displayedAlerts.map((alert, index) => {
    return (
      <div className="Metro__Alert__Item" key={index}>{alert.description}</div>
    );
  });
  return (
    <div className="Metro__Alert__ListContainer d-flex justify-content-center align-items-center h-75">
      <div className="Metro__Alert__List">{alertJsx}</div>
    </div>
  );
}

export default MetroAlerts;