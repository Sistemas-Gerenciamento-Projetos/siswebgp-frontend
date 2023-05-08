import React from "react"
import Sidebar from "../../components/sidebar/sidebar.component"

const Painel = () => {

  return(
    <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', height: '100vh'}}>
      <div style={{width: '20%', backgroundColor: '#ffffff', margin: '20px'}}>
        <Sidebar menuItem={2}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
        <h1> Painel </h1>
      </div>
    </div>
  )
}

export default Painel