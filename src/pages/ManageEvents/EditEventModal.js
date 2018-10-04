import React, { Component } from 'react';
import axios from 'axios';
import EventModal from './EventModal';

class EditEventModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const eventId = this.props.formData.id;
    this.setState({ showSubmitLoading: true });
    axios.put(`/api/events/${eventId}`, formData)
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
        title="Edit Event"
        okText="Update"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default EditEventModal;