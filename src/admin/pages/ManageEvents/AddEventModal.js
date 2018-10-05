import React, { Component } from 'react';
import axios from 'axios';
import EventModal from './EventModal';

class AddEventModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    this.setState({ showSubmitLoading: true });
    axios.post('/api/events', formData)
      .then((response) => {
        this.setState({ showSubmitLoading: false });
        this.props.onSuccess(response.data);
      })
      .catch((error) => {
        this.setState({ showSubmitLoading: false });
      });
  }

  render() {
    return (
      <EventModal 
        {...this.props} 
        title="Add New Event"
        okText="Add"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default AddEventModal;