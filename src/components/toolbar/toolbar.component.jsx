import React from 'react'

const Toolbar = (props) => {
    const { title} = props

    return (
        <div style={{backgroundColor: '#ffffff', marginTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '80px'}}>
            <h3 style={{marginLeft: '10px'}}>{title}</h3>
        </div>
    )
}

export default Toolbar