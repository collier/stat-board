import React from 'react';
import cn from 'classnames';

import styles from './Slide.module.css';

const Slide = ({ title, children, message, titleTheme, bodyTheme }) => {
  let slideContent = children;
  if(message) {
    slideContent = (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className={styles.message}>{message}</div>
      </div>
    );
  }
  return (
    <div className={cn('slide', styles.slide, bodyTheme)}>
      <div className={cn('row justify-content-center', styles.titleContainer, titleTheme)}>
        {title}
      </div>
      <div className={cn(styles.bodyContainer)}>{slideContent}</div>
    </div>
  );
}

export default Slide;