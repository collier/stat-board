import React, { Component } from 'react';
import { message, Icon, Popconfirm, Button, Layout, Alert, Table, Card, Divider } from 'antd';
import axios from 'axios';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import filter from 'lodash/filter';
import moment from 'moment';

const { Content } = Layout;

class ManageEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      addModalVisible: false,
      editModalVisible: false,
      activeEvent: null,
      events: []
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
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

  handleClickAdd() {
    this.setState({
      addModalVisible: true
    });
  }

  handleClickEdit(record) {
    this.setState({
      editModalVisible: true,
      activeEvent: record
    });
  }

  handleClickCancel() {
    this.setState({
      addModalVisible: false,
      editModalVisible: false,
      activeEvent: null
    });
  }

  handleConfirmDelete(id, name) {
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

  handleAddEvent(event) {
    this.setState(({ events }) => ({
      events: events.concat(event),
      addModalVisible: false
    }));
  }

  handleEditEvent(event) {
    this.setState(({ events }) => {
      const newEvents = events.map(currEvent => {  
        if(currEvent.id === event.id) {
          currEvent = event;
        }
        return currEvent;
      });
      return {
        events: newEvents,
        editModalVisible: false
      }
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
        defaultSortOrder: 'ascend',
        sorter: (a, b) => { return a.eventDate.localeCompare(b.eventDate) },
        render: (text, record) => {
          if(record.displayTimeFlag) {
            return moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY h:mm A');
          } else {
            return moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY');
          }
        }
      }, {
        title: 'All Day Event?',
        dataIndex: 'displayTimeFlag',
        key: 'displayTimeFlag',
        render: (text) => {
          return text ? 'No' : 'Yes';
        }
      }, {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => (
          <span>
            <a href={null} onClick={() => this.handleClickEdit(record)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm 
              title={`Are you sure want to delete the "${record.name}" event?`}
              onConfirm={() => this.handleConfirmDelete(record.id, record.name)} 
              icon={<Icon type="warning" />}
              okText="Yes" 
              cancelText="No">
                <a href={null}>Delete</a>
            </Popconfirm>
          </span>
        )
      }];
      return (
        <Content style={{ margin: '16px' }}>
          <Card title="Events" bordered={false}>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={this.handleClickAdd}>
              Add New Event
            </Button>
            <AddEventModal 
              visible={this.state.addModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleAddEvent} 
            />
            <EditEventModal 
              visible={this.state.editModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleEditEvent} 
              formData={this.state.activeEvent}
            />
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

export default ManageEvents;
