import React, { Component } from 'react';
import { 
  message, 
  Icon, 
  Popconfirm, 
  Button, 
  Layout, 
  Alert, 
  Table, 
  Card,
  Divider 
} from 'antd';
import axios from 'axios';
import AddCompetitionModal from './AddCompetitionModal';
import EditCompetitionModal from './EditCompetitionModal';
import filter from 'lodash/filter';
import moment from 'moment';

const { Content } = Layout;

class ManageCompetitions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      addModalVisible: false,
      editModalVisible: false,
      activeCompetition: null,
      competitions: []
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleAddCompetition = this.handleAddCompetition.bind(this);
    this.handleEditCompetition = this.handleEditCompetition.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
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

  handleClickAdd() {
    this.setState({
      addModalVisible: true
    });
  }

  handleClickEdit(record) {
    this.setState({
      editModalVisible: true,
      activeCompetition: record
    });
  }

  handleClickCancel() {
    this.setState({
      addModalVisible: false,
      editModalVisible: false,
      activeCompetition: null
    });
  }

  handleConfirmDelete(id, name) {
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

  handleAddCompetition(competition) {
    this.setState(({ competitions }) => ({
      competitions: competitions.concat(competition),
      addModalVisible: false
    }));
  }

  handleEditCompetition(competition) {
    this.setState(({ competitions }) => {
      const newCompetitions = competitions.map(currComp => {  
        if(currComp.id === competition.id) {
          currComp = competition;
        }
        return currComp;
      });
      return {
        competitions: newCompetitions,
        editModalVisible: false
      }
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
        render: text => moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MM/DD/YYYY'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => { return a.completedOn.localeCompare(b.completedOn) }
      }, {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => (
          <span>
            <a href={null} onClick={() => this.handleClickEdit(record)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm 
              title={`Are you sure want to delete the "${record.name}" competition?`}
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
          <Card title="Competitions" bordered={false}>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={this.handleClickAdd}>
              Add New Competition
            </Button>
            <AddCompetitionModal 
              visible={this.state.addModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleAddCompetition} 
            />
            <EditCompetitionModal 
              visible={this.state.editModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleEditCompetition} 
              formData={this.state.activeCompetition}
            />
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
