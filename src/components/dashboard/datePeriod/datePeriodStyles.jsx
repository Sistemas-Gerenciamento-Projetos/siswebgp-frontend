const styles = {
    root: {
        width: '250px',
        display: 'flex', 
        flexDirection: 'column'
    },

    datesDiv: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        height: '40px', 
        borderRadius: '10px', 
        border: '1px solid #d9d9d9', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },

    dateIcons: {
        color: '#bfbfbf'
    },

    delayedDiv: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '20px',
        justifyContent: 'flex-start'
    },

    warningIcon: {
        color: '#ff0000',
        fontSize: '12px'
    },

    warningText: {
        color: '#ff0000', 
        marginLeft: '5px',
        fontSize: '12px'
    }
}

export default styles