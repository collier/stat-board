import React, { Component } from 'react';
import axios from 'axios';
import CompetitionModal from './CompetitionModal';

class EditCompetitionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const competitionId = this.props.formData.id;
    this.setState({ showSubmitLoading: true });
    axios.put(`/api/competitions/${competitionId}`, formData)
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
        title="Edit Competition"
        okText="Update"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default EditCompetitionModal;