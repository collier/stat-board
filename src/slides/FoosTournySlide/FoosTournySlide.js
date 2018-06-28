import React from 'react';

import Slide from '../../components/Slide/Slide';

import './FoosTournySlide.css';

const FoosTournySlide = () => (
  <Slide title="foos tourney">
    <div className="slide__content">
      <iframe title="foos" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTQTJJRfMjQOLYNpbpcymxerAVTmSpo4Z5Nxr5IboDCUsoh8ISbymzO34gqDNd7wZzURCTjp5NJK7Ca/pubhtml?gid=543235194&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
    </div>
  </Slide>
);

export default FoosTournySlide;