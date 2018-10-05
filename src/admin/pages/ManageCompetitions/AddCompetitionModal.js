import React, { Component } from 'react';
import axios from 'axios';
import CompetitionModal from './CompetitionModal';

class AddCompetitionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    this.setState({ showSubmitLoading: true });
    axios.post('/api/competitions', formData)
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
      <CompetitionModal 
        {...this.props} 
        title="Add New Competition"
        okText="Add"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default AddCompetitionModal;