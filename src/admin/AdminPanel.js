import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Redirect, NavLink, Route } from 'react-router-dom';
import { 
  ManageEvents, 
  ManageCompetitions, 
  ManagePetOfTheMonth
} from './pages';
import PetIcon from './components/PetIcon';

import './AdminPanel.css';

const { Footer, Sider } = Layout;

const AdminPanel = ({ match, location }) => {
  var activeKey = location.pathname === match.url ? `${match.url}/events` : location.pathname;
  return (
    <div className="AdminPanel">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={256} style={{background: '#051a6d'}}>
          <img src="../img/CPT_Horizontal_White.png" alt="c20g-logo" className="AdminPanel-Image" />
          <div className="AdminPanel-Title">
            Stat Board Admin Panel
          </div>
          <Menu theme="dark" defaultSelectedKeys={[activeKey]} mode="inline" style={{ width: 256 }}>
            <Menu.Item key={`${match.url}/events`}>
              <NavLink to={`${match.url}/events`} className="nav-text">
                <Icon type="calendar" theme="outlined" />
                <span>Events</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={`${match.url}/competitions`}>
              <NavLink to={`${match.url}/competitions`} className="nav-text">
                <Icon type="crown" theme="outlined" />
                <span>Competitions</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={`${match.url}/pet-of-the-month`}>
              <NavLink to={`${match.url}/pet-of-the-month`} className="nav-text">
                <PetIcon />
                <span>Pet of the Month</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Route path={`${match.url}/events`} component={ManageEvents} />
          <Route path={`${match.url}/competitions`} component={ManageCompetitions} />
          <Route path={`${match.url}/pet-of-the-month`} component={ManagePetOfTheMonth} />
          <Route exact path={`${match.url}`} render={() => (
            <Redirect to={`${match.url}/events`} />
          )}/>
          
          <Footer style={{ textAlign: 'center' }}>
            Counterpoint Stat Board Admin Panel, Built by DJ Collier
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminPanel;
