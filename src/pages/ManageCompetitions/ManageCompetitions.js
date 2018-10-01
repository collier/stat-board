import React, { Component } from 'react';
import { message, Icon, Popconfirm, Button, Layout, Alert, Table, Card } from 'antd';
import axios from 'axios';
import filter from 'lodash/filter';
import moment from 'moment';

const { Content } = Layout;

class ManageCompetitions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      competitions: []
    };
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/api/competitions')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          competitions: response.data
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isLoaded: true,
          error
        }));
      });
  }

  onConfirmDelete(id, name) {
    const deleteMsg = message.loading(`Deleting "${name}" competition...`, 0);
    axios.delete(`/api/competitions/${id}`)
      .then((response) => {
        setTimeout(deleteMsg, 0);
        message.success(`"${name}" competition successfully deleted.`);
        this.setState(({ competitions }) => {
          var newCompetitions = filter(competitions, (competition) => {
            return competition.id !== id;
          });
          return {
            competitions : newCompetitions
          };
        });
      })
      .catch((error) => {
        setTimeout(deleteMsg, 0);
        message.error(`Unable to delete "${name}" competition.`);
      });
  }

  render() {
    const { error, isLoaded, competitions } = this.state;
    if(error) {
      return (
        <Alert
          message="Error"
          description="There was an error loading competitions"
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
        title: 'Winner',
        dataIndex: 'winner',
        key: 'winner'
      }, {
        title: 'Completed On',
        dataIndex: 'completedOn',
        key: 'completedOn',
        render: text => moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY')
      }, {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => (
          <Popconfirm 
            title={`Are you sure want to delete the "${record.name}" competition?`}
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
          <Card title="Competitions" bordered={false}>
            <Button type="primary" style={{ marginBottom: '16px' }}>
              Add New Competition
            </Button>
            <Table 
              columns={columns} 
              dataSource={competitions} 
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

export default ManageCompetitions;
