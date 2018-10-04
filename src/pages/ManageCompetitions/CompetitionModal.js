import React, { Component } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  DatePicker
} from 'antd';
import moment from 'moment';
import IconSelector from '../../components/IconSelector/IconSelector';

const FormItem = Form.Item;

const AddCompetitionModal = Form.create()(
  class extends Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
      const form = this.props.form;
      this.setState({ showSubmitLoading: true });
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        let formData = {
          name: values.name,
          winner: values.winner,
          icon: values.icon.value,
          completedOn: moment(values.eventDate).format('YYYY-MM-DD')
        };
        if(this.props.formData) {
          formData.id = this.props.formData.id;
        }
        this.props.onSubmit(formData);
      });
    }

    checkIcon(rule, value, callback) {
      if(value) {
        if(value.value) {
          callback();
          return;
        }
      }
      callback('Please provide an icon');
    }

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
          title={this.props.title}
          visible={this.props.visible}
          className="AddCompetitionModal"
          destroyOnClose={true}
          onOk={this.handleSubmit}
          okText={this.props.okText}
          onCancel={this.props.onCancel}
          width={600}
          okButtonProps={{
            loading: this.props.showSubmitLoading
          }}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="Choose Icon"
              className="ChooseIcon"
            >
              {getFieldDecorator('icon', {
                initialValue: this.props.formData ? {
                  value: this.props.formData.icon,
                  label: this.props.formData.icon
                } : null,
                rules: [
                  { validator: this.checkIcon }
                ],
              })(
                <IconSelector />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Competition Name"
            >
              {getFieldDecorator('name', {
                initialValue: this.props.formData ? this.props.formData.name : null,
                rules: [
                  { max: 100 },
                  {
                    required: true, message: 'Please provide an competition name',
                  }
                ],
              })(
                <Input placeholder="Competition Name" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Winner"
            >
              {getFieldDecorator('winner', {
                initialValue: this.props.formData ? this.props.formData.winner : null,
                rules: [
                  { max: 100 },
                  {
                    required: true, message: 'Please provide a competition winner',
                  }
                ],
              })(
                <Input placeholder="Winner" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Completed On"
            >
              {getFieldDecorator('completedOn', {
                initialValue: this.props.formData ? moment(this.props.formData.completedOn, moment.HTML5_FMT.DATE) : moment(),
                rules: [{
                  required: true, message: 'Please provide a date when the competition concluded',
                }]
              })(
                <DatePicker format="MM/DD/YYYY" placeholder="Completed On" />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }

  }
);

export default AddCompetitionModal;
