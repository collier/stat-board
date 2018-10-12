import React from 'react';
import changeCase from 'change-case';
import cn from 'classnames';

// import './Slide.css';
import styles from './Slide.module.css';

const Slide = ({ title, children, message, titleTheme, bodyTheme }) => {
  let slideContent = children;
  const slideName = changeCase.paramCase(title);
  if(message) {
    slideContent = (
      <div className={cn('d-flex justify-content-center align-items-center', styles.messageContainer)}>
        <div className={styles.message}>{message}</div>
      </div>
    );
  }
  return (
    <div className={cn('slide', bodyTheme)}>
      <div className={cn('row justify-content-center', styles.titleContainer, titleTheme)}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={cn(styles.bodyContainer)}>{slideContent}</div>
    </div>
  );
}

export default Slide;