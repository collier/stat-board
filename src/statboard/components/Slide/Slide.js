import React from 'react';
import changeCase from 'change-case';

import './Slide.css';

const Slide = ({ title, children, message }) => {
  let slideContent = children;
  const slideName = changeCase.paramCase(title);
  if(message) {
    slideContent = (
      <div className="d-flex justify-content-center align-items-center slide__content">
        <div className="slide__message">{message}</div>
      </div>
    );
  }
  return (
    <div className={`slide slide--${slideName}`}>
      <div className="row justify-content-center slide__title-container">
        <h1 className="slide__title">{title}</h1>
      </div>
      <div className="slide__content-container">{slideContent}</div>
    </div>
  );
}

export default Slide;