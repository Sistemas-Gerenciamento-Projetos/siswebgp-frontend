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

const Home = () => {
  const [userDetails] = useUserDetails();

  const [menuItem, setMenuItem] = useState(0);

  return (
    <div className="home">
      {userDetails.accessToken ? (
        <div>
          <Toolbar setMenuItem={setMenuItem} menuItem={menuItem} />
          <div className="body-home">
            {menuItem === 0 && <Projetos />}
            {menuItem === 1 && <Backlog />}
            {menuItem === 2 && <Painel />}
            {menuItem === 3 && <Roteiro />}
            {menuItem === 4 && <Epics />}
          </div>
        </div>
      ) : (
        <Authentication />
      )}
    </div>
  );
};

export default Home;
