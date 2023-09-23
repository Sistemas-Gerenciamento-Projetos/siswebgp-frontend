import React, { useState } from 'react';
import Authentication from '../authentication/authentication';
import Projetos from '../projetos/projetos.component';
import { useUserDetails } from '../../context/usercontext';
import './home.styles.scss';
import Backlog from '../backlog/backlog.component';
import Painel from '../painel/painel.component';
import Roteiro from '../roteiro/roteiro.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import Epics from '../epics/epics.component';
import Dashboard from '../dashboard/dashboard.component';
import SGPSidebar from '../../components/sidebar/sidebar.component';

const Home = () => {
  const [userDetails] = useUserDetails();

  const [menuItem, setMenuItem] = useState(0);

  return (
    <div className="home">
      {userDetails.accessToken ? (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <SGPSidebar setMenuItem={setMenuItem} menuItem={menuItem} />
          <div style={{ width: '100%' }}>
            <Toolbar setMenuItem={setMenuItem} menuItem={menuItem} />
            <div className="body-home">
              {menuItem === 0 && <Projetos />}
              {menuItem === 1 && <Dashboard />}
              {menuItem === 2 && <Backlog />}
              {menuItem === 3 && <Painel />}
              {menuItem === 4 && <Roteiro />}
              {menuItem === 5 && <Epics />}
            </div>
          </div>
        </div>
      ) : (
        <Authentication />
      )}
    </div>
  );
};

export default Home;
