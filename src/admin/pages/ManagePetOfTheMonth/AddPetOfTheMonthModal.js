import React, { Component } from 'react';
import axios from 'axios';
import PetOfTheMonthModal from './PetOfTheMonthModal';

class AddPetOfTheMonthModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubmitLoading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    this.setState({ showSubmitLoading: true });
    axios.post('/api/pets-of-the-month', formData)
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
        title="Add New Pet of the Month"
        okText="Add"
        onSubmit={this.handleSubmit} 
        showSubmitLoading={this.state.showSubmitLoading}
      />
    );
  }

}

export default AddPetOfTheMonthModal;