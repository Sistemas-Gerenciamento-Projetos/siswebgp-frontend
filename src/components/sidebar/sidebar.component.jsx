import React from 'react';
import PropTypes from 'prop-types';

import {
  OrderedListOutlined,
  GroupOutlined,
  BarChartOutlined,
  TableOutlined,
  CloseOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import styles from './sidebarStyles.component';
import { useProjectDetails } from '../../context/projectContext';
import { Container } from './styles';

const Sidebar = ({ menuItem, setMenuItem, active }) => {
  const [projectDetails] = useProjectDetails();

  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <CloseOutlined
        onClick={closeSidebar}
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          fontSize: '24px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginTop: '20px', width: '100%' }}>
          <div
            to="/painel"
            style={
              menuItem === 0
                ? styles.menuItemSelectedDiv
                : styles.menuItemUnselectedDiv
            }
            onClick={() => setMenuItem(0)}
          >
            <div>
              <GroupOutlined style={{ paddingLeft: '20px' }} />
              <span
                style={
                  menuItem === 0 ? styles.textSelected : styles.textUnselected
                }
              >
                Projetos
              </span>
            </div>
            {menuItem === 0 && <div style={styles.blueDiv}></div>}
          </div>

          {projectDetails.projectId !== '' && (
            <div>
              <div
                style={
                  menuItem === 1
                    ? styles.menuItemSelectedDiv
                    : styles.menuItemUnselectedDiv
                }
                onClick={() => setMenuItem(1)}
              >
                <div>
                  <OrderedListOutlined style={{ paddingLeft: '20px' }} />
                  <span
                    style={
                      menuItem === 1
                        ? styles.textSelected
                        : styles.textUnselected
                    }
                  >
                    Backlog
                  </span>
                </div>
                {menuItem === 1 && <div style={styles.blueDiv}></div>}
              </div>

              <div
                style={
                  menuItem === 2
                    ? styles.menuItemSelectedDiv
                    : styles.menuItemUnselectedDiv
                }
                onClick={() => setMenuItem(2)}
              >
                <div>
                  <TableOutlined style={{ paddingLeft: '20px' }} />
                  <span
                    style={
                      menuItem === 2
                        ? styles.textSelected
                        : styles.textUnselected
                    }
                  >
                    Painel
                  </span>
                </div>
                {menuItem === 2 && <div style={styles.blueDiv}></div>}
              </div>

              <div
                style={
                  menuItem === 3
                    ? styles.menuItemSelectedDiv
                    : styles.menuItemUnselectedDiv
                }
                onClick={() => setMenuItem(3)}
              >
                <div>
                  <BarChartOutlined style={{ paddingLeft: '20px' }} />
                  <span
                    style={
                      menuItem === 3
                        ? styles.textSelected
                        : styles.textUnselected
                    }
                  >
                    Roteiro
                  </span>
                </div>
                {menuItem === 3 && <div style={styles.blueDiv}></div>}
              </div>

              <div
                style={
                  menuItem === 4
                    ? styles.menuItemSelectedDiv
                    : styles.menuItemUnselectedDiv
                }
                onClick={() => setMenuItem(4)}
              >
                <div>
                  <TrophyOutlined style={{ paddingLeft: '20px' }} />
                  <span
                    style={
                      menuItem === 4
                        ? styles.textSelected
                        : styles.textUnselected
                    }
                  >
                    Épicos
                  </span>
                </div>
                {menuItem === 3 && <div style={styles.blueDiv}></div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

Sidebar.propTypes = {
  menuItem: PropTypes.number.isRequired,
  setMenuItem: PropTypes.func.isRequired,
  active: PropTypes.func.isRequired,
};

export default Sidebar;
