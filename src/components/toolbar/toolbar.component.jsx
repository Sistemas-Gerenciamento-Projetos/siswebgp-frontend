import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styles from './toolbarStyles.component';
import { useUserDetails } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { useProjectDetails } from '../../context/projectContext';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/sidebar.component';

const Toolbar = ({ title, setIndex, menuItem }) => {
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
    updateProjectDetails('', '', '');
    nav('/');
  };

  const showSidebar = () => setSidebar(!sidebar);

  const isProjectsPage = (title) => title === 'Meus projetos';

  return (
    <div style={styles.root}>
      <div style={styles.titleDiv}>
        <MenuOutlined onClick={showSidebar} style={styles.menuIcon} />
        {sidebar && (
          <Sidebar
            active={setSidebar}
            menuItem={menuItem}
            setMenuItem={setIndex}
          />
        )}
        <h3 style={styles.title}>{title}</h3>
        {isProjectsPage(title) && (
          <Button color="primary" onClick={() => setIndex(1)}>
            Novo projeto
          </Button>
        )}
      </div>
      <Button color="primary" onClick={logoutHandler}>
        Sair
      </Button>
    </div>
  );
};

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  setIndex: PropTypes.func.isRequired,
  menuItem: PropTypes.number.isRequired,
};

export default Toolbar;
