import React from 'react';
import PropTypes from 'prop-types';

import {
  OrderedListOutlined,
  GroupOutlined,
  BarChartOutlined,
  TableOutlined,
  CloseOutlined,
  TrophyOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import styles from './sidebarStyles.component';
import { useProjectDetails } from '../../context/projectContext';
import { Container } from './styles';

const Sidebar = ({ menuItem, setMenuItem, active }) => {
  const [projectDetails] = useProjectDetails();
  const collapsedLocalStorage =
    localStorage.getItem('sidebarCollapsed') === null
      ? true
      : localStorage.getItem('sidebarCollapsed') === 'true';
  const [collapsed, setCollapsed] = useState(collapsedLocalStorage);
  const theme = 'light';
  const navigate = useNavigate();

  function handleClickCollapse() {
    localStorage.setItem('sidebarCollapsed', !collapsed);
    setCollapsed(!collapsed);
  }

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes['light'].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes['light'].menu.menuContent, !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(
          themes['light'].menu.hover.backgroundColor,
          1,
        ),
        color: themes['light'].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
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
              </MenuItem>
              <MenuItem
                icon={<HomeOutlined />}
                onClick={() =>
                  navigate(`/projects/${projectDetails.projectId}/dashboard`)
                }
                disabled={projectDetails.projectId === ''}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                icon={<OrderedListOutlined />}
                onClick={() =>
                  navigate(`/projects/${projectDetails.projectId}/backlog`)
                }
                disabled={projectDetails.projectId === ''}
              >
                Backlog
              </MenuItem>
              <MenuItem
                icon={<TableOutlined />}
                onClick={() =>
                  navigate(`/projects/${projectDetails.projectId}/painel`)
                }
                disabled={projectDetails.projectId === ''}
              >
                Painel
              </MenuItem>
              <MenuItem
                icon={<BarChartOutlined />}
                onClick={() =>
                  navigate(`/projects/${projectDetails.projectId}/roteiro`)
                }
                disabled={projectDetails.projectId === ''}
              >
                Roteiro
              </MenuItem>
              <MenuItem
                icon={<TrophyOutlined />}
                onClick={() =>
                  navigate(`/projects/${projectDetails.projectId}/epics`)
                }
                disabled={projectDetails.projectId === ''}
              >
                Épicos
              </MenuItem>
            </Menu>
          </MenuItemContent>
          <div onClick={handleClickCollapse}>
            <SGPSidebarFooter collapsed={collapsed} />
          </div>
        </MenuContent>
      </Sidebar>
    </Root>
  );
}
