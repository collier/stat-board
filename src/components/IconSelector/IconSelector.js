import React, { Component } from 'react';
import { Spin } from 'antd';
import map from 'lodash/map';
import axios from 'axios';
import VirtualizedSelect from 'react-virtualized-select';

import './IconSelector.css';

class IconSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      icons: [],
      selectedIcon: props.value || null
    };
    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        selectedIcon: value
      });
    }
  }

  handleChange(selectedIcon)  {
    if(!('value' in this.props)) {
      this.setState({ selectedIcon });
    }
    this.triggerChange(selectedIcon);
  }

  triggerChange(changedValue) {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if(onChange) {
      onChange(changedValue);
    }
  }
  
  componentDidMount() {
    axios.get('/api/icons')
      .then((response) => {
        var result = map(response.data, (value, key) => {
          var iconPath = value.replace('img/icons/', '');
          return {
            value: iconPath,
            label: iconPath
          }
        });
        this.setState(() => ({
          isLoaded: true,
          icons: result
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  customOptionRender({ focusedOption, focusOption, key, option, options, selectValue, style }) {
    let classNames = ['IconSelectorOption'];
    if(option === focusedOption) {
      classNames.push('VirtualizedSelectFocusedOption')
    }
    return (
      <div
        className={classNames.join(' ')}
        key={key}
        onClick={() => selectValue(option)}
        onMouseEnter={() => focusOption(option)}
        style={style}
      >
        <img src={`img/icons/${option.value}`} className="IconSelectorImage" alt="icon-display" />
        <label className="IconSelectorLabel">{option.value}</label>
      </div>
    );
  }

  renderPreview() {
    const { selectedIcon } = this.state;
    if(selectedIcon) {
      const icon = selectedIcon.value;
      if(icon) {
        return <img src={`img/icons/${icon}`} className="IconSelectorPreview" alt="icon-display" />;
      }
    }
    return null;
  }

  render() {
    const { error, isLoaded, icons } = this.state;
    if(error) {
      return <p>Unable to load icons...</p>;
    } else if(!isLoaded) {
      return <Spin />;
    } else {
      return (
        <div>
          <VirtualizedSelect
            options={icons}
            onChange={this.handleChange}
            optionRenderer={this.customOptionRender}
            optionHeight={75}
            maxHeight={400}
            value={this.state.selectedIcon}
            size={32}
          />
          {this.renderPreview()}
        </div>
      );
    }
    
  }
}

export default IconSelector;