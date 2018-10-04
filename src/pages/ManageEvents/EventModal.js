import React, { Component } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  DatePicker,
  Checkbox
} from 'antd';
import moment from 'moment';
import IconSelector from '../../components/IconSelector/IconSelector';

const FormItem = Form.Item;

const AddEventModal = Form.create()(
  class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showSubmitLoading: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.disableDates = this.disableDates.bind(this);
    }

    onSubmit() {
      const form = this.props.form;
      this.setState({ showSubmitLoading: true });
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        let formData = {
          name: values.name,
          eventDate: moment(values.eventDate).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          location: values.location,
          icon: values.icon.value,
          displayTimeFlag : !values.allDayEvent
        };
        if(this.props.formData) {
          formData.id = this.props.formData.id;
        }
        this.props.onSubmit(formData);
      });
    }

    disableDates(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day');
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
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 7,
          },
        },
      };
      return (
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          className="AddEventModal"
          destroyOnClose={true}
          onOk={this.onSubmit}
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
              label="Event Name"
            >
              {getFieldDecorator('name', {
                initialValue: this.props.formData ? this.props.formData.name : null,
                rules: [{
                  required: true, message: 'Please provide an event name',
                }],
              })(
                <Input placeholder="Event Name" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Location"
            >
              {getFieldDecorator('location', {
                initialValue: this.props.formData ? this.props.formData.location : 'Counterpoint',
              })(
                <Input placeholder="Location" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Date/Time of Event"
            >
              {getFieldDecorator('eventDate', {
                initialValue: this.props.formData ? moment(this.props.formData.eventDate, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS) : null,
                rules: [{
                  required: true, message: 'Please provide a Date/Time for the event',
                }]
              })(
                <DatePicker
                  showTime
                  disabledDate={this.disableDates}
                  format="MM/DD/YYYY h:mm A"
                  placeholder="Date/Time of Event"
                />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('allDayEvent', {
                initialValue: this.props.formData ? !this.props.formData.displayTimeFlag : null,
                valuePropName: 'checked'
              })(
                <Checkbox>All day event</Checkbox>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }

  }
);

export default AddEventModal;
