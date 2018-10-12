import React from 'react';
import cn from 'classnames';

import styles from './DrinkStat.module.css';

const DrinkStat = ({ icon, value, label }) => (
  <div className={cn('row', styles.drinkStat)}>
    <div className="col-3 d-flex justify-content-center align-items-center">
      <img src={`img/icons/${icon}`} className={styles.icon} alt="icon" />
    </div>
    <div className="col-9">
      <div className="row">
        <div className={styles.value}>{value}</div>
      </div>
      <div className="row">
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  </div>
);

export default DrinkStat;