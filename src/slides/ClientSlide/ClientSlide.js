import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import axios from 'axios';
import geodist from 'geodist';
import maxBy from 'lodash/maxBy';
import numeral from 'numeral';

import Slide from '../../components/Slide/Slide';

import worldMapObj from './world-50m.json';

import './ClientSlide.css';

class ClientSlide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clients: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.nextSlide !== this.props.nextSlide && this.props.slideNumber === this.props.nextSlide) {
      this.fetchData();
    }
  }

  fetchData() {
    axios.get('/api/clients')
      .then((response) => {
        const c20gCoordinates = { lat: 38.9187, lon: -77.2311 };
        const clients = response.data.map((client) => {
          client.distanceToC20g = geodist(c20gCoordinates, {
            lat: client.latitude,
            lon: client.longitude
          });
          return client;
        });
        this.setState(() => ({
          isLoaded: true,
          clients
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <Slide title="clients" message="Whoops, something broke." />;
    } else if (!isLoaded) {
      return <Slide title="clients" message="Loading..." />;
    } else {
      const markers = this.state.clients.map((client) => ({
        markerOffset: 0,
        name: client.name,
        coordinates: [ client.longitude, client.latitude ]
      }));
      const projectCount = this.state.clients.reduce((count, client) => {
        return count + client.projectCount
      }, 0);
      const farthestClient = maxBy(this.state.clients, 'distanceToC20g');
      const distToFarthestClient = numeral(farthestClient.distanceToC20g).format('0,0');
      return (
        <Slide title="clients">
          <div className="row slide__content">
            <div className="col-4">
              <div className="d-flex align-items-center h-33">
                <div className="ClientStat">
                  <div className="ClientStat__value">{this.state.clients.length}</div>
                  <div className="ClientStat__label">Number of Clients</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-33">
                <div className="ClientStat">
                  <div className="ClientStat__value">{projectCount}</div>
                  <div className="ClientStat__label">Number of Projects</div>
                </div>
              </div>
              <div className="d-flex align-items-center h-33">
                <div className="ClientStat">
                  <div className="ClientStat__value">{distToFarthestClient}<span className="units">mi</span></div>
                  <div className="ClientStat__label">Farthest Client</div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <ComposableMap
                width={1280}
                height={990}
                projectionConfig={{ scale: 205 }}
              >
                <ZoomableGroup center={[-90,39]} zoom={6} disablePanning>
                  <Geographies geography={worldMapObj}>
                    {(geographies, projection) => 
                      geographies.map((geography, i) => {
                        return (
                          geography.properties.CONTINENT === 'North America' && (
                            <Geography
                              key={ i }
                              geography={ geography }
                              projection={ projection }
                              style={{
                                default: {
                                  fill: "#ECEFF1",
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none",
                                },
                                hover: {
                                  fill: "#ECEFF1",
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none",
                                },
                                pressed: {
                                  fill: "#ECEFF1",
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none",
                                },
                              }}
                            />
                          )
                        )
                      }
                    )}
                  </Geographies>
                  <Markers>
                    {markers.map((marker, i) => (
                      <Marker
                        key={i}
                        marker={marker}
                        style={{
                          default: { fill: "#051a6d" },
                          hover: { fill: "#FFFFFF" },
                          pressed: { fill: "#FF5722" },
                        }}
                        >
                        <circle
                          cx={0}
                          cy={0}
                          r={6}
                          style={{
                            stroke: "#051a6d",
                            strokeWidth: 2,
                            opacity: 1,
                          }}
                        />
                      </Marker>
                    ))}
                  </Markers>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>
        </Slide>
      );
    }
  }
}

export default ClientSlide;