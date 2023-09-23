import React from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Root } from './sgpSidebarFooter.styles';

export default function SGPSidebarFooter({ collapsed }) {
  return (
    <Root>
      {collapsed ? (
        <DoubleRightOutlined style={{ fontSize: '24px', color: '#0098e5' }} />
      ) : (
        <DoubleLeftOutlined style={{ fontSize: '24px', color: '#0098e5' }} />
      )}
    </Root>
  );
}
