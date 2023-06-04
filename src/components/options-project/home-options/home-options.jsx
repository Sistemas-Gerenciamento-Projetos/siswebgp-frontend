import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InviteUsers from "../form-invite-user/invite-users.component";
import AddNewUser from "../add-new-user/add-new-user";
import "./home-options-styles.scss";

function OptionsProject() {
  return (
    <div className="main-home-project">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="home" title="Convidar novo membro">
          <InviteUsers />
        </Tab>
        <Tab eventKey="profile" title="Adicionar novo membro">
          <AddNewUser />
        </Tab>
      </Tabs>
    </div>
  );
}

export default OptionsProject;
