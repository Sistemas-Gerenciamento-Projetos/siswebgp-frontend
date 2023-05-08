import React from 'react'
import { Button } from "reactstrap"
import styles from './toolbarStyles.component'

function isProjectsPage(title) {
    return title === 'Meus projetos'
}

const Toolbar = (props) => {
    const { title} = props

    return (
        <div style={styles.root}>
            <div style={styles.titleDiv}>
                <h3 style={styles.title}>{title}</h3>
                {isProjectsPage(title) && <Button color='primary' onClick={() => {/* add new project function here */}}>Novo projeto</Button>}
            </div>
            <Button color='primary' onClick={() => {/* add exit function here */}}>Sair</Button>
        </div>
    )
}

export default Toolbar