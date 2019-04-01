import React from 'react';
import cn from 'classnames';

import styles from './SimpleSlide.module.css';

function SimpleSlide({slideValue, slideLabel, background}) {

  return (
    <div className={cn('slide', styles.slide)} style={{backgroundColor: background}}>
      <div className="row h-100 justify-content-center align-items-center">
        <div>
          <div className={styles.label}>{slideLabel}</div>
          <div className={styles.value}>{slideValue}</div>
        </div>
      </div>
    </div>
  );

}

export default SimpleSlide;