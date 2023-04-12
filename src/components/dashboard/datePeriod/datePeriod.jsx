import React from 'react'
import { SwapRightOutlined, CalendarOutlined } from '@ant-design/icons'

const DatePeriod = (props) => {
    const { startDate, endDate } = props;

    const startDateParsed = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    const endDateParsed = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`
    
    return(
        <div style={{display: 'flex', flexDirection: 'row', width: '250px', height: '45px', borderRadius: '10px', border: '1px solid #d9d9d9', alignItems: 'center', justifyContent: 'space-around'}}>
            <p>{startDateParsed}</p>
            <SwapRightOutlined style={{color: '#bfbfbf'}}/>
            <p>{endDateParsed}</p>
            <CalendarOutlined style={{color: '#bfbfbf'}}/>
        </div>
    )
}

export default DatePeriod