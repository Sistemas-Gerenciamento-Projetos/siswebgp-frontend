import React from 'react'
import styles from './managerPhotoStyles'
import { UserOutlined } from "@ant-design/icons";

const ManagerPhoto = (props) => {
    const { name } = props
    return (
        <div style={styles.root}>
            <div style={styles.iconDiv}>
                <UserOutlined style={styles.icon} />
            </div>
            <p style={styles.name}>{name}</p>
        </div>
    )
}

export default ManagerPhoto