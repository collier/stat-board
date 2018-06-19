import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Skycons from 'skycons';
const Skycons = require('skycons')(window);

class SkyIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skycons: new Skycons(props.objConf)
    }
  }

  componentDidMount() {
    const { skycons } = this.state;
    const iconName = this.props.icon.toUpperCase().replace(/-/g, '_');
    skycons.add(ReactDOM.findDOMNode(this), Skycons[iconName]);
    skycons.play()
  }

  componentWillUnmount () {
    const { skycons } = this.state;
    skycons.pause();
    skycons.remove(ReactDOM.findDOMNode(this));
  }

  render() {
    return (
      <canvas {...this.props.canvasConfig} />
    );
  }

}

export default SkyIcon;