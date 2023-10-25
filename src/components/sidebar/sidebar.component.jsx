import React, { useState } from 'react';

import {
  OrderedListOutlined,
  GroupOutlined,
  BarChartOutlined,
  TableOutlined,
  TrophyOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useProjectDetails } from '../../context/projectContext';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import SGPSidebarHeader from './header/sgpSidebarHeader.component';
import { MenuContent, MenuItemContent, Root, themes } from './sidebar.styles';
import SGPSidebarFooter from './footer/sgpSidebarFooter.component';
import { useNavigate } from 'react-router-dom';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function SGPSidebar() {
  const [projectDetails] = useProjectDetails();
  const [collapsed, setCollapsed] = useState(true);
  const theme = 'light';
  const navigate = useNavigate();

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
    <Root>
      <Sidebar
        collapsed={collapsed}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <MenuContent>
          <SGPSidebarHeader collapsed={collapsed} />
          <MenuItemContent>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<GroupOutlined />}
                onClick={() => navigate(`/projects`)}
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
          <div onClick={() => setCollapsed(!collapsed)}>
            <SGPSidebarFooter collapsed={collapsed} />
          </div>
        </MenuContent>
      </Sidebar>
    </Root>
  );
}
