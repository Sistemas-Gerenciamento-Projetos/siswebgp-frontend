import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styles from './toolbarStyles.component';
import { useUserDetails } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { useProjectDetails } from '../../context/projectContext';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/sidebar.component';

const Toolbar = ({ setMenuItem, menuItem }) => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [sidebar, setSidebar] = useState(false);
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectName');
    console.log(updateUserDetails);
    updateUserDetails(false, false, false);
    updateProjectDetails('', '', '', '');
    nav('/');
  };

  const showSidebar = () => setSidebar(!sidebar);

  const getTitle = () => {
    switch (menuItem) {
      case 0:
        return 'Meus projetos';
      case 1:
        return 'Dashboard';
      case 2:
        return 'Backlog';
      case 3:
        return 'Painel';
      case 4:
        return 'Roteiro';
      case 5:
        return 'Épicos';
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.titleDiv}>
        <MenuOutlined onClick={showSidebar} style={styles.menuIcon} />
        {sidebar && (
          <Sidebar
            active={setSidebar}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        <h3 style={styles.title}>{getTitle()}</h3>
      </div>
      <Button color="primary" onClick={logoutHandler}>
        Sair
      </Button>
    </div>
  );
};

Toolbar.propTypes = {
  setMenuItem: PropTypes.func.isRequired,
  menuItem: PropTypes.number.isRequired,
};

export default Toolbar;
