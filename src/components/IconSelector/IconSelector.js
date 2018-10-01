import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';

import './IconSelector.css';

const Option = Select.Option;

class IconSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      icons: []
    };
  }

  componentDidMount() {
    axios.get('/api/icons')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          icons: response.data
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
    const { error, isLoaded, icons } = this.state;
    if(error) {
      return <p>Unable to load icons...</p>;
    } else if(!isLoaded) {
      return <Spin />;
    } else {
      const options = icons.map(filePath => {
        var shortPath = filePath.replace('img\\icons\\', '');
        return (
          <Option key={shortPath} value={shortPath}>
            <img src={filePath} className="IconImage" alt="icon-display" />
            {shortPath}
          </Option>
        );
      });
      return (
        <div className="IconSelector">
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            placeholder="Select an Icon"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.indexOf(input.toLowerCase()) >= 0}
          >
            {options}
          </Select>
        </div>
        
      )
    }
    
  }
}

export default IconSelector;