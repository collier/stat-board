import React, { Component } from 'react';
import Slider from 'react-slick';
import {
  IntroSlide,
  WeatherSlide,
  DrinkSlide,
  StaffSlide,
  CompetitionSlide,
  CorpEventsSlide,
  CountdownSlide,
  MetroSlide,
  MarchMadnessSlide
} from './slides';

class StatBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialSlide: 0,
      nextSlide: 1,
      autoplay: true,
      slideDuration: 10000,
      slideTransitionSpeed: 3000,
      theme: 'Default' // Default, Halloween
    };
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  onSlideChange(slideIndex) {
    const numberOfSlides = this.sliderRef.props.children.length;
    let nextSlideIndex = this.state.nextSlide + 1;
    if(nextSlideIndex >= numberOfSlides) {
      nextSlideIndex = this.state.initialSlide;
      setTimeout(() => {
        this.sliderRef.slickGoTo(this.state.initialSlide);
      }, this.state.slideDuration);
    }
    this.setState(() => ({
      nextSlide: nextSlideIndex
    }));
  }

  render() {
    const settings = {
      autoplay: this.state.autoplay,
      initialSlide: this.state.initialSlide,
      afterChange: this.onSlideChange,
      arrows: false,
      autoplaySpeed: this.state.slideDuration,
      dots: false,
      draggable: false,
      infinite: false,
      pauseOnHover : false,
      speed: this.state.slideTransitionSpeed,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      touchMove: false
    };
    return (
      <Slider {...settings} ref={sliderRef => (this.sliderRef = sliderRef)}>
        <IntroSlide slideNumber={0} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <WeatherSlide slideNumber={1} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <DrinkSlide slideNumber={2} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <StaffSlide slideNumber={3} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <CompetitionSlide slideNumber={4} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <CorpEventsSlide slideNumber={5} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <MetroSlide slideNumber={6} nextSlide={this.state.nextSlide} theme={this.state.theme} />
        <CountdownSlide 
          slideNumber={7} 
          nextSlide={this.state.nextSlide} 
          theme={this.state.theme} 
          eventName="Game of Thrones Final Season" 
          eventTime="2019-04-14T21:00:00"
          eventImg="img/game-of-thrones-season-8.jpg"
        />
        <MarchMadnessSlide slideNumber={8} nextSlide={this.state.nextSlide} theme={this.state.theme} />
      </Slider>
    );
  }
}

export default StatBoard;
