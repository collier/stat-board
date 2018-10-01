import React, { Component } from 'react';
import { message, Icon, Popconfirm, Button, Layout, Alert, Table, Card } from 'antd';
import axios from 'axios';
import AddEventModal from './AddEventModal/AddEventModal';
import filter from 'lodash/filter';
import moment from 'moment';

const { Content } = Layout;

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      modalVisible: false,
      events: []
    };
    this.showModal = this.showModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/api/events')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          events: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  showModal() {
    this.setState({
      modalVisible: true
    });
  }

  onConfirmDelete(id, name) {
    const deleteMsg = message.loading(`Deleting "${name}" event...`, 0);
    axios.delete(`/api/events/${id}`)
      .then((response) => {
        setTimeout(deleteMsg, 0);
        message.success(`"${name}" event successfully deleted.`);
        this.setState(({ events }) => {
          var newEvents = filter(events, (event) => {
            return event.id !== id;
          });
          return {
            events : newEvents
          };
        });
      })
      .catch((error) => {
        setTimeout(deleteMsg, 0);
        message.error(`Unable to delete "${name}" event.`);
      });
  }

  render() {
    const { error, isLoaded, events } = this.state;
    if(error) {
      return (
        <Alert
          message="Error"
          description="There was an error loading events"
          type="error"
          showIcon
        />
      );
    } else {
      const columns = [{
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        width: 100,
        render: text => <img src={`img/icons/${text}`} style={{ width: '66px' }} alt="icon-display" />
      }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      }, {
        title: 'Event Date',
        dataIndex: 'eventDate',
        key: 'eventDate',
        render: (text, record) => {
          if(record.displayTimeFlag) {
            return moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY h:mm A');
          } else {
            return moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY');
          }
        }
      }, {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => (
          <Popconfirm 
            title={`Are you sure want to delete the "${record.name}" event?`}
            onConfirm={() => this.onConfirmDelete(record.id, record.name)} 
            icon={<Icon type="warning" />}
            okText="Yes" 
            cancelText="No">
              <a href={null}>Delete</a>
          </Popconfirm>
        )
      }];
      return (
        <Content style={{ margin: '16px' }}>
          <Card title="Events" bordered={false}>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={this.showModal}>
              Add New Event
            </Button>
            <AddEventModal visible={this.state.modalVisible} />
            <Table 
              columns={columns} 
              dataSource={events} 
              rowKey="id"
              loading={!isLoaded}
              size="small"
            />
          </Card>
        </Content>
      );
    }
  }

}

export default Events;
