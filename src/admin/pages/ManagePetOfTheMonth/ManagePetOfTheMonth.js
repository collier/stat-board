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
import filter from 'lodash/filter';
import moment from 'moment';
import AddPetOfTheMonthModal from './AddPetOfTheMonthModal';
import EditPetOfTheMonthModal from './EditPetOfTheMonthModal';

const { Content } = Layout;

class ManagePetOfTheMonth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      addModalVisible: false,
      editModalVisible: false,
      activePet : null,
      pets: []
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/pets-of-the-month')
      .then((response) => {
        this.setState(() => ({
          isLoaded: true,
          pets: response.data
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
      activePet: record
    });
  }

  handleClickCancel() {
    this.setState({
      addModalVisible: false,
      editModalVisible: false,
      activePet: null
    });
  }

  handleConfirmDelete(id, petName) {
    const deleteMsg = message.loading(`Deleting "${petName}" pet of the month...`, 0);
    axios.delete(`/api/pets-of-the-month/${id}`)
      .then((response) => {
        setTimeout(deleteMsg, 0);
        message.success(`"${petName}" pet of the month successfully deleted.`);
        this.setState(({ pets }) => {
          var newPets = filter(pets, (pet) => {
            return pet.id !== id;
          });
          return {
            pets : newPets
          };
        });
      })
      .catch((error) => {
        setTimeout(deleteMsg, 0);
        message.error(`Unable to pet of the month "${petName}".`);
      });
  }

  handleAddEvent(pet) {
    this.setState(({ pets }) => ({
      pets: pets.concat(pet),
      addModalVisible: false
    }));
  }

  handleEditEvent(pet) {
    this.setState(({ pets }) => {
      const newPets = pets.map(currPet => {  
        if(currPet.id === pet.id) {
          currPet = pet;
        }
        return currPet;
      });
      return {
        pets: newPets,
        editModalVisible: false
      }
    });
  }

  render() {
    const { error, isLoaded, pets } = this.state;
    if(error) {
      return (
        <Alert
          message="Error"
          description="There was an error loading pets"
          type="error"
          showIcon
        />
      );
    } else {
      const columns = [{
        title: 'Pet Image',
        dataIndex: 'picture',
        key: 'picture',
        width: 100,
        render: text => <img src={`img/${text}`} style={{ width: '125px' }} alt="icon-display" />
      }, {
        title: 'Pet Name',
        dataIndex: 'petName',
        key: 'petName',
        width: 100
      }, {
        title: 'Species',
        dataIndex: 'petSpecies',
        key: 'petSpecies',
        width: 100
      }, {
        title: 'Owner',
        dataIndex: 'ownerName',
        key: 'ownerName',
        width: 100
      }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 600
      }, {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        width: 100,
        defaultSortOrder: 'descend',
        sorter: (a, b) => { return a.month.localeCompare(b.month) },
        render: text => moment(text, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('MMMM YYYY')
      }, {
        title: 'Action',
        key: 'action',
        width: 100,
        render: (text, record) => (
          <span>
            <a href={null} onClick={() => this.handleClickEdit(record)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm 
              title={`Are you sure want to delete the "${record.petName}" pet of the month?`}
              onConfirm={() => this.handleConfirmDelete(record.id, record.petName)} 
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
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={this.handleClickAdd}>
              Add New Pet of the Month
            </Button>
            <AddPetOfTheMonthModal 
              visible={this.state.addModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleAddEvent} 
            />
            <EditPetOfTheMonthModal 
              visible={this.state.editModalVisible} 
              onCancel={this.handleClickCancel} 
              onSuccess={this.handleEditEvent} 
              formData={this.state.activePet}
            />
            <Table 
              columns={columns} 
              dataSource={pets} 
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

export default ManagePetOfTheMonth;
