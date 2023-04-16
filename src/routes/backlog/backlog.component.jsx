import React from "react"
import Sidebar from "../../components/sidebar/sidebar.component"

const Backlog = () =>{

  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '20%'}}>
        <Sidebar menuItem={1}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
        <h1> Backlog </h1>
      </div>
    </div>
  )
}

export default Backlog