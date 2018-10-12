import React from 'react';

import styles from './MetroAlerts.module.css';

const EmptyAlerts = () => (
  <div className="d-flex justify-content-center align-items-center h-75">
    <div className={styles.noAlertsText}>No Alerts</div>
    <img className={styles.noAlertsIcon} src="img/icons/entertainment/026-confetti.png" alt="no-alerts" />
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
      <div className={styles.alertText} key={index}>{alert.description}</div>
    );
  });
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div>{alertJsx}</div>
    </div>
  );
}

export default MetroAlerts;