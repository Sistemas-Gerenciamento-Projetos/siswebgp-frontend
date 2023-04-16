import React, { useState } from "react";
import ICLogo from '../../Assets/qmgqqq5s.png'
import { OrderedListOutlined, GroupOutlined } from "@ant-design/icons";
import styles from "./sidebarStyles.component";
import { Link, useNavigate } from "react-router-dom";


const Sidebar = (props) => {
  const { menuItem } = props
  const [menuItemSelected, setMenuItemSelected] = useState(menuItem)
  const navigate = useNavigate()

  function navigateToDashboard() {
    setMenuItemSelected(0)
    navigate('/painel')
  }

  function navigateToBacklog() {
    setMenuItemSelected(1)
    navigate('/backlog')
  }

  function navigateToPainel() {
    setMenuItemSelected(2)
  }

  function navigateToRoteiro() {
    setMenuItemSelected(3)
    navigate('/roteiro')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center'}}>
      <img src={ICLogo} alt="ic logo" style={{width: '150px', height: '200px'}} />
      
      <div style={{marginTop: '20px', width: '100%'}}>
        <div to='/painel' style={menuItemSelected === 0 ? styles.menuItemSelectedDiv : styles.menuItemUnselectedDiv} onClick={() => navigateToDashboard()}>
          <div>
            <GroupOutlined style={{paddingLeft: '20px'}} />
            <span style={menuItemSelected === 0 ? styles.textSelected : styles.textUnselected}>Projetos</span>
          </div>
          {menuItemSelected === 0 && <div style={styles.blueDiv}></div>}
        </div>
      
        <div style={menuItemSelected === 1 ? styles.menuItemSelectedDiv : styles.menuItemUnselectedDiv} onClick={() => navigateToBacklog()}>
          <div>
            <OrderedListOutlined style={{paddingLeft: '20px'}} />
            <span style={menuItemSelected === 1 ? styles.textSelected : styles.textUnselected}>Backlog</span>
          </div>
          {menuItemSelected === 1 && <div style={styles.blueDiv}></div>}
        </div>
      
        <div style={menuItemSelected === 2 ? styles.menuItemSelectedDiv : styles.menuItemUnselectedDiv} onClick={() => navigateToPainel()}>
          <div>
            <GroupOutlined style={{paddingLeft: '20px'}} />
            <span style={menuItemSelected === 2 ? styles.textSelected : styles.textUnselected}>Painel</span>
          </div>
          {menuItemSelected === 2 && <div style={styles.blueDiv}></div>}
        </div>
      
        <div style={menuItemSelected === 3 ? styles.menuItemSelectedDiv : styles.menuItemUnselectedDiv} onClick={() => navigateToRoteiro()}>
          <div>
            <GroupOutlined style={{paddingLeft: '20px'}} />
            <span style={menuItemSelected === 3 ? styles.textSelected : styles.textUnselected}>Roteiro</span>
          </div>
          {menuItemSelected === 3 && <div style={styles.blueDiv}></div>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar