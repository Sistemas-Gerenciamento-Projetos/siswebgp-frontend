import React from 'react'
import { Button } from "reactstrap";

const Toolbar = (props) => {
    const { title} = props

    return (
        <div style={{backgroundColor: '#ffffff', marginTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '80px', justifyContent: 'space-between', paddingRight: '10px'}}>
            <h3 style={{marginLeft: '10px'}}>{title}</h3>
            <Button color='primary'>Sair</Button>
        </div>
    )
}

export default Toolbar