const styles = {
    menuItemUnselectedDiv: {
        display: 'flex', 
        flexDirection: 'row', 
        height: '40px', 
        alignItems: 'center', 
        width: '100%',
        marginBottom: '5px'
    },

    menuItemSelectedDiv: {
        display: 'flex', 
        flexDirection: 'row', 
        height: '40px', 
        alignItems: 'center', 
        width: '100%', 
        marginBottom: '5px', 
        backgroundColor: '#bae7ff',
        justifyContent: 'space-between'
    },

    textSelected: {
        paddingLeft: '10px', 
        color: '#1890ff'
    },

    textUnselected: {
        paddingLeft: '10px'
    },

    blueDiv: {
        width: '2px', 
        height: '100%', 
        backgroundColor: '#1890ff', 
        display: 'flex', 
        alignItems: 'flex-end'
    }
}

export default styles