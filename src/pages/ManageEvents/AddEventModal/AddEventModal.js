import React, { Component } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  DatePicker
} from 'antd';
import IconSelector from '../../../components/IconSelector/IconSelector';

import './AddEventModal.css';

const FormItem = Form.Item;

class AddEventModal extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="Add New Event"
        visible={this.props.visible}
        className="AddEventModal"
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="Choose Icon"
            className="ChooseIcon"
          >
            <IconSelector />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Event Name"
          >
            <Input placeholder="Event Name" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Location"
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please provide a location',
              }],
            })(
              <Input placeholder="Location" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date/Time of Event"
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Date/Time of Event"
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

export default Form.create({})(AddEventModal);
