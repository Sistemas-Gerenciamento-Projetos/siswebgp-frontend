const styles = {
    root: {
        width: '25%',
        display: 'flex', 
        flexDirection: 'column'
    },

    datesDiv: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        height: '45px', 
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    warningIcon: {
        color: '#ff0000'
    },

    warningText: {
        color: '#ff0000', 
        marginLeft: '5px',
        fontSize: '10px'
    }
}

export default styles