import React, { Component } from 'react';
import axios from 'axios';
import PetOfTheMonthModal from './PetOfTheMonthModal';

class EditPetOfTheMonthModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const petOfTheMonthId = this.props.formData.id;
    this.setState({ showSubmitLoading: true });
    axios.put(`/api/pets-of-the-month/${petOfTheMonthId}`, formData)
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
      <PetOfTheMonthModal 
        {...this.props} 
        title="Edit Pet of the Month"
        okText="Update"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default EditPetOfTheMonthModal;