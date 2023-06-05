import React, { useState } from "react";
import sgpLogo from "../../Assets/logo sgp (jpg).jpg";

import {
  OrderedListOutlined,
  GroupOutlined,
  BarChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import styles from "./sidebarStyles.component";
import { useProjectDetails } from "../../context/projectContext";

const Sidebar = (props) => {
  const { menuItem, setMenuItem } = props;

  // const [menuItemSelected, setMenuItemSelected] = useState(menuItem);
  const [projectDetails] = useProjectDetails();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <img
        src={sgpLogo}
        alt="ic logo"
        style={{ width: "100%", marginTop: "10px" }}
      />

      <div style={{ marginTop: "20px", width: "100%" }}>
        <div
          to="/painel"
          style={
            menuItem === 0
              ? styles.menuItemSelectedDiv
              : styles.menuItemUnselectedDiv
          }
          onClick={() => setMenuItem(0)}>
          <div>
            <GroupOutlined style={{ paddingLeft: "20px" }} />
            <span
              style={
                menuItem === 0 ? styles.textSelected : styles.textUnselected
              }>
              Projetos
            </span>
          </div>
          {menuItem === 0 && <div style={styles.blueDiv}></div>}
        </div>

        {projectDetails.projectId !== "" && (
          <div>
            <div
              style={
                menuItem === 1
                  ? styles.menuItemSelectedDiv
                  : styles.menuItemUnselectedDiv
              }
              onClick={() => setMenuItem(1)}>
              <div>
                <OrderedListOutlined style={{ paddingLeft: "20px" }} />
                <span
                  style={
                    menuItem === 1 ? styles.textSelected : styles.textUnselected
                  }>
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
              onClick={() => setMenuItem(2)}>
              <div>
                <TableOutlined style={{ paddingLeft: "20px" }} />
                <span
                  style={
                    menuItem === 2 ? styles.textSelected : styles.textUnselected
                  }>
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
              onClick={() => setMenuItem(3)}>
              <div>
                <BarChartOutlined style={{ paddingLeft: "20px" }} />
                <span
                  style={
                    menuItem === 3 ? styles.textSelected : styles.textUnselected
                  }>
                  Roteiro
                </span>
              </div>
              {menuItem === 3 && <div style={styles.blueDiv}></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
