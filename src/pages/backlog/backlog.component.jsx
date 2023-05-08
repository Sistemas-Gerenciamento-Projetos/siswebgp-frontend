import React from "react"
import Sidebar from "../../components/sidebar/sidebar.component"
import Header from "../../components/header/header"
import Taskitem from "../../components/taskitem/taskitem"
import { Button } from "reactstrap"

const Backlog = () =>{

  return(
    <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', height: '100vh'}}>
      

      <div style={{width: '20%', backgroundColor: '#ffffff', margin: '20px'}}>
        <Sidebar menuItem={1}/>
      </div>
     
      

      <div style={{display: 'flex', flexDirection: 'column', width: '80%', backgroundColor: '#ffffff', marginTop: '20px', marginRight: '20px', marginBottom: '20px'}}>
        <Header />
        <p></p>
        <div>
        <Button color="primary" style={{display: 'flex', marginLeft: '15px'}}>Nova Tarefa</Button>
        </div>
  
        <Taskitem />

      </div>

      
    </div>
  )
}

export default Backlog