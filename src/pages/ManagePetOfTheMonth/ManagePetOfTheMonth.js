import React, { Component } from 'react';
import { message, Icon, Popconfirm, Button, Layout, Alert, Table, Card, Divider } from 'antd';
import axios from 'axios';
import filter from 'lodash/filter';
import moment from 'moment';

const { Content } = Layout;

class ManagePetOfTheMonth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pets: []
    };
  }

  componentDidMount() {
    // axios.get('/api/events')
    //   .then((response) => {
    //     this.setState(() => ({
    //       isLoaded: true,
    //       events: response.data
    //     }));
    //   })
    //   .catch((error) => {
    //     this.setState(() => ({
    //       isLoaded: true,
    //       error
    //     }));
    //   });
  }

  render() {
    const { error, isLoaded, pets } = this.state;
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
            <a href={null}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm 
              title={`Are you sure want to delete the "${record.name}" event?`}
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
          <Card title="Pet of the Month" bordered={false}>
            <Button type="primary" style={{ marginBottom: '16px' }}>
              Add New Pet of the Month
            </Button>
            <Table 
              columns={columns} 
              dataSource={pets} 
              rowKey="id"
              loading={false}
              size="small"
            />
          </Card>
        </Content>
      );
    }
  }

}

export default ManagePetOfTheMonth;
