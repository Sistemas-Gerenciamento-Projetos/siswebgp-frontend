import React, { useState } from 'react';
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
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarFooter,
  menuClasses,
} from 'react-pro-sidebar';
import SGPSidebarHeader from './header/SGPSidebarHeader';
import { Typography } from './Typography';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function SGPSidebar({ menuItem, setMenuItem, active }) {
  const [projectDetails] = useProjectDetails();
  const [collapsed, setCollapsed] = useState(true);
  const theme = 'light';

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <Sidebar
        collapsed={collapsed}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div onClick={() => setCollapsed(!collapsed)}>
            <SGPSidebarHeader />
          </div>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<GroupOutlined />} onClick={() => setMenuItem(0)}>
                Projetos
              </MenuItem>
              {projectDetails.projectId !== '' && (
                <>
                  <MenuItem
                    icon={<HomeOutlined />}
                    onClick={() => setMenuItem(1)}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    icon={<OrderedListOutlined />}
                    onClick={() => setMenuItem(2)}
                  >
                    Backlog
                  </MenuItem>
                  <MenuItem
                    icon={<TableOutlined />}
                    onClick={() => setMenuItem(3)}
                  >
                    Painel
                  </MenuItem>
                  <MenuItem
                    icon={<BarChartOutlined />}
                    onClick={() => setMenuItem(4)}
                  >
                    Roteiro
                  </MenuItem>
                  <MenuItem
                    icon={<TrophyOutlined />}
                    onClick={() => setMenuItem(5)}
                  >
                    Épicos
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

Sidebar.propTypes = {
  menuItem: PropTypes.number.isRequired,
  setMenuItem: PropTypes.func.isRequired,
  active: PropTypes.func.isRequired,
};

export default SGPSidebar;
