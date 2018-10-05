import React, { Component } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  Upload,
  Button,
  Icon,
  DatePicker,
  message
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker } = DatePicker;

const PetOfTheMonthModal = Form.create()(
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
          ownerName: values.ownerName,
          petName: values.petName,
          petSpecies: values.petSpecies,
          description: values.description,
          picture : `pets/${values.picture[0].name}`,
          month : moment(values.month).format('YYYY-MM[-01T00:00:00Z]'),
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

    handleImageChange(info) {
      let { file } = info;
      const isValidFileType = file.type === 'image/jpeg' || file.type === 'image/png';
      if(!isValidFileType) {
        message.error('Image must be a jpg or png');
        return [];
      }
      if(file.status === 'removed') {
        return [];
      }
      if(file.response) {
        if(file.response.error) {
          file.response = file.response.error;
        }
      }
      return [info.file];
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
          className="AddPetOfTheMonthModal"
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
              label="Upload Pet Image"
              extra="Image must be a square jpg or png. The file must have a unique name (Example: Bill-Lou.png). If the uploaded file already exists on the server, it will be overwritten."
            >
              {getFieldDecorator('picture', {
                valuePropName: 'fileList',
                getValueFromEvent: this.handleImageChange,
                initialValue: this.props.formData ? [{
                  uid : '-1',
                  name: this.props.formData.picture.replace('pets/', ''),
                  status: 'done',
                  url: `img/${this.props.formData.picture}`,
                  thumbUrl: `img/${this.props.formData.picture}`,
                }] : null,
                rules: [
                  {
                    required: true, message: 'Please provide the pet\'s image',
                  }
                ]
              })(
                <Upload 
                  name="petImage" 
                  action="/api/pet-image" 
                  listType="picture" 
                  multiple={false}>
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Pet Name"
            >
              {getFieldDecorator('petName', {
                initialValue: this.props.formData ? this.props.formData.petName : null,
                rules: [
                  { max: 100 }, {
                    required: true, message: 'Please provide the pet\'s name',
                  }
                ],
              })(
                <Input placeholder="Pet Name" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Species"
            >
              {getFieldDecorator('petSpecies', {
                initialValue: this.props.formData ? this.props.formData.petSpecies : null,
                rules: [
                  { max: 100 }, {
                    required: true, message: 'Please provide the pet\'s species',
                  }
                ],
              })(
                <Input placeholder="Species" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Owner's Name"
            >
              {getFieldDecorator('ownerName', {
                initialValue: this.props.formData ? this.props.formData.ownerName : null,
                rules: [
                  { max: 100 }, {
                    required: true, message: 'Please provide the pet owner\'s name',
                  }
                ],
              })(
                <Input placeholder="Owner's Name" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Description"
            >
              {getFieldDecorator('description', {
                initialValue: this.props.formData ? this.props.formData.description : null,
                rules: [
                  { max: 350 }, {
                    required: true, message: 'Please provide the pet\'s description',
                  }
                ],
              })(
                <TextArea placeholder="Enter pet description here. Try to get the description to be as close to 350 characters as possible. (350 characters max)" autosize={{ minRows: 6 }} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Month"
            >
              {getFieldDecorator('month', {
                initialValue: this.props.formData ? moment(this.props.formData.month, moment.HTML5_FMT.DATE) : null,
                rules: [{
                  required: true, message: 'Please provide the month that should be assigned to this pet',
                }]
              })(
                <MonthPicker placeholder="Select month" />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }

  }
);

export default PetOfTheMonthModal;
